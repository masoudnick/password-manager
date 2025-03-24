import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      headerSearchPlaceholder: "Search Password ...",
      add: "Add",
      editPassword: "Edit password",
      newPassword: "Add new password",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      password: "Password",
      site: "Site",
      username: "Username",
      note: "Note",
      requireSite: "URL is required",
      invalidSite: "Invalid URL format",
      requiredUsername: "Username is required",
      requiredPassword: "Password is required",
    },
  },
  fa: {
    translation: {
    headerSearchPlaceholder: "جستجوی رمز عبور ...",
      add: "افزودن",
      editPassword: "ویرایش رمز عبور",
      newPassword: "رمز عبور جدید",
      password: "رمز عبور",
      edit: "ویرایش",
      delete: "حذف",
      save: "ذخیره",
      cancel: "لغو",
      site: "سایت",
      username: "نام کاربری",
      note: "یادداشت",
      requireSite: "آدرس سایت الزامی است",
      invalidSite: "آدرس سایت معتبر نیست",
      requiredUsername: "نام کاربری الزامی است",
      requiredPassword: "رمزعبور الزامی است",

    },
  },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "fa",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
