var scripTitle;
var scripBody;
var textCopy;
var menu;
var backsqr;

const copy = () => {
  scripTitle = document.getElementById("scripTitle").textContent;
  scripBody = document.getElementById("scripBody").textContent;
  textCopy = document.getElementById("textCopy");

  navigator.clipboard.writeText(
    ` Today's scripture : ${scripTitle} -  ${scripBody}`
  );
  textCopy.style.display = "block ";
  textCopy.style.animation = "copied 2s";
  textCopy.style.transition = "ease-in-out";

  setTimeout(() => {
    textCopy.style.animation = "none";
  }, 2100);
};

const showMenu = () => {
  menu = document.getElementById("aside-nav");
  if (menu.style.display == "none") {
    menu.style.width = "85px";
    menu.style.height = "107px";
    menu.style.display = "flex";
    menu.style.animationDirection = "normal";
    menu.style.transition = "ease-in-out";
    setTimeout(() => {
      menu.style.width = "150px";
      menu.style.height = "807px";
    }, 2000);
  } else {
    menu.style.display = "none";
  }
};
