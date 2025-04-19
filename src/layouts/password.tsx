import { ArrowLeft02Icon } from "hugeicons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Modal } from "../components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

type Password = {
  id: number;
  username: string;
  password: string;
  site: string;
};

const Paswword = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<Password>({
    id: 0,
    username: "",
    password: "",
    site: "",
  });

  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("http://localhost/password-manager/api.php?id=" + location.state.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchPassword = async () => {
    const res = await fetch(
      "http://localhost/password-manager/api.php?id=" + location.state.id
    );
    const data = await res.json();
    setPassword(data.data[0]);
  };

  const deletePassword = async () => {
    fetch("http://localhost/password-manager/api.php?id=" + location.state.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchPassword();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchPassword();
    setValue("username", password.username);
    setValue("password", password.password);
  }, [isOpen]);

  const back = () => navigate(-1);

  const getRootDomain = (url: string) => {
    url.replace(/^https?:\/\//, '')
    url = url.replace(/^www\./, '').split('/')[0]
    return url;
  };

  return (
    <main>
      <section className="flex mb-9 items-center flex-row-reverse justify-start">
        <ArrowLeft02Icon
          onClick={back}
          className="p-1 cursor-pointer rounded-full ms-1.5 hover:bg-[var(--color-hover)]"
          size={"30px"}
          strokeWidth="2"
        />
        <img
          className="ms-3 shrink-0 hidden"
          src="src\assets\images\twitter.png"
          alt=""
          width="20"
          height="20"
        />
        <h2 className="text-lg">{getRootDomain(password.site)}</h2>
      </section>

      <div className="rounded-xl bg-[var(--card-bg-color)] shadow-[var(--card-shadow)]">
        <div className="">
          <div className="grid grid-cols-2 p-5 mt-4 gap-x-4 gap-y-5">
            <Input
              label={t("username")}
              type="text"
              readOnly={true}
              value={password.username}
            />
            <Input
              label={t("password")}
              type="password"
              readOnly={true}
              value={password.password}
            />
          </div>
          <div className="py-4 px-5 border-t border-[var(--color-hover)]">
            <button
              className="btn px-4 py-1.5 rounded me-3"
              onClick={() => setIsOpen(true)}
            >
              {t("edit")}
            </button>
            <button
              className="btn px-4 py-1.5 rounded"
              onClick={deletePassword}
            >
              {t("delete")}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={t("editPassword")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", { required: t("requiredUsername") })}
            error={errors.username}
            label={t("username")}
            type="text"
            readOnly={false}
          />
          <Input
            {...register("password", { required: t("requiredPassword") })}
            error={errors.password}
            label={t("password")}
            type="password"
            readOnly={false}
          />
          <div className="flex gap-x-2 mt-2">
            <button
              className="btn px-4 py-2 rounded"
              type="submit"
              disabled={errors.username || errors.password ? true : false}
            >
              {t("save")}
            </button>
            <button
              className="btn px-4 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default Paswword;
