import { ArrowLeft01Icon } from "hugeicons-react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Modal, Input } from "../components";
import { Link } from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
  site: string;
};

const Main = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({mode: "onSubmit"});

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const { t } = useTranslation();

  return (
    <main>
      <section className="flex items-center">
        <h2 className="grow text-xl">{t("password")}</h2>
        <button
          className="btn px-4 py-1"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          {t("add")}
        </button>
      </section>
      <section className="rounded-lg overflow-hidden bg-[#292a2d] mt-5">
        <ul>
          <li className="relative hover:bg-[var(--color-hover)] before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:w-5/6 before:h-px before:bg-[var(--color-hover)] before:mx-auto">
            <Link
              to="/x.com"
              className="flex items-center py-3 px-3.5 w-full hover:bg-[var(--color-hover)]"
              type="button"
            >
              <img
                className="me-5 shrink-0"
                src="src\assets\images\twitter.png"
                alt="twitter"
                width="16"
                height="16"
              />
              <div className="flex grow">
                <p className="grow text-start">
                  <span>x.com • api.</span>
                  <b>twitt</b>
                  <span>er.com</span>
                </p>
                <ArrowLeft01Icon
                  className="cursor-pointer rounded-full hover:bg-[var(--color-hover)]"
                  size={"20px"}
                  strokeWidth="1"
                />
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              to="/x.com"
              className="flex items-center py-3 px-3.5 w-full hover:bg-[var(--color-hover)]"
              type="button"
            >
              <img
                className="me-5 shrink-0"
                src="src\assets\images\twitter.png"
                alt="twitter"
                width="16"
                height="16"
              />
              <div className="flex grow">
                <p className="grow text-start">
                  <span>x.com • api.</span>
                  <b>twitt</b>
                  <span>er.com</span>
                </p>
                <ArrowLeft01Icon
                  className="cursor-pointer rounded-full hover:bg-[var(--color-hover)]"
                  size={"20px"}
                  strokeWidth="1"
                />
              </div>
            </Link>
          </li>
        </ul>
      </section>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={t("newPassword")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("site", { required: t("requireSite"), pattern: {
              value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i,
              message: t('invalidSite'),
            }, })}
            error={errors.site}
            type="text"
            label={t("site")}
            placeholder="example.com"
            readOnly={false}
          />

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
              disabled={
                errors.site || errors.username || errors.password ? true : false
              }
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

export default Main;
