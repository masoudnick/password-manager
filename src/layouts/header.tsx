import { Search01Icon } from "hugeicons-react";

const Header = () => {
  return (
    <header className="mb-5">
      <label
        className="flex items-center bg-[#282828] rounded-full cursor-text outline-solid outline-transparent outline-offset-2 px-2 py-1.5 hover:bg-[#e3e3e314]"
        htmlFor="search"
      >
        <Search01Icon
          className="p-1.5 cursor-pointer rounded-full hover:bg-[var(--ripple-bg)]"
          size={"26px"}
          strokeWidth="2"
        />
        <input
          className="grow-1 ms-1.5 text-xs"
          id="search"
          type="search"
          placeholder="جستجوی رمز عبور ..."
          autoComplete="off"
        />
      </label>
    </header>
  );
};

export default Header;
