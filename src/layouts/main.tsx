import { ArrowLeft01Icon } from "hugeicons-react"; // Replace with the correct path

const Main = () => {
  return (
    <main>
      <section className="flex items-center">
        <h2 className="grow">رمز عبور</h2>
        <button className="btn px-4 py-1" type="button">
          افزودن
        </button>
      </section>
      <section className="rounded-lg overflow-hidden bg-[#292a2d] mt-5">
        <ul>
          <li className="">
            <button className="flex items-center py-3 px-3.5 w-full hover:bg-[var(--ripple-bg)]" type="button">
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
                  className="cursor-pointer rounded-full hover:bg-[var(--ripple-bg)]"
                  size={"20px"}
                  strokeWidth="1"
                />
              </div>
            </button>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Main;
