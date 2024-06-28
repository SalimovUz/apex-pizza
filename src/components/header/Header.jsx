import React from "react";
import logo from "@public/logo.jpg";
import call from "@public/call.svg";
import halal from "@public/halal.png";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const moveProfile = () => {
    navigate("/profile");
  };

  const avatarUrl = localStorage.getItem("avatarUrl");

  return (
    <div>
      <nav>
        <div className="left flex items-center space-x-16">
          <div className="logo flex items-center gap-2">
            <img className="w-20 h-20 rounded-2xl" src={logo} alt="" />
            <div>
              <h4 className="m-0 p-0 font-[comfortaa] font-bold">apexpizza</h4>
              <h6 className="m-0 p-0">Нет места для теста</h6>
            </div>
          </div>

          <div className="delivery">
            <h5 className="text-[#1E1B26]">Доставка пиццы за 35 мин.</h5>
            <h6 className="text-[#8e8d92] text-[16px] font-normal">
              Работаем круглосуточно 24/7
            </h6>
          </div>

          <div className="contact gap-2 flex items-center">
            <img src={call} alt="" />
            <div className="flex items-center flex-col gap-1">
              <h5 className=" m-0 p-0 text-[#1E1B26]">(71) 202-20-20</h5>
              <h6 className=" m-0 p-0 text-[#8e8d92] text-[16px] font-normal">
                Звоните сейчас!
              </h6>
            </div>
          </div>

          <div className="halal flex items-center gap-2">
            <img className="h-16 w-16" src={halal} alt="" />
            <h4 className="font-bold text-[18px]"> СЕРТИФИКАТ ХАЛЯЛЪ</h4>
          </div>

          {avatarUrl ? (
            <img
              onClick={moveProfile}
              src={avatarUrl}
              alt=""
              className="w-12 h-12 text-center cursor-pointer rounded-full"
            />
          ) : (
            <h1
              onClick={moveProfile}
              className="text-[18px] bg-blue-950 rounded-full p-2 text-white w-11 h-10 text-center cursor-pointer"
            >
              {localStorage.getItem("username")
                ? localStorage.getItem("username").charAt(0).toUpperCase()
                : ""}
            </h1>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
