var scripTitle;
var scripBody;
var textCopy;

const copy = () => {
  scripTitle = document.getElementById("scripTitle").textContent;
  scripBody = document.getElementById("scripBody").textContent;
  textCopy = document.getElementById("textCopy");

  navigator.clipboard.writeText(
    ` Today's scripture : ${scripTitle} -  ${scripBody}`
  );
  textCopy.style.display = "block ";

  setTimeout(() => {
    textCopy.style.display = "none ";
  }, 2100);
};
