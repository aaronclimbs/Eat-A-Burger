document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".eat").forEach(button => {
    button.addEventListener("click", handleEat);
  });
});

function pics() {
  const pic = document.querySelector("#burgerPic");
  fetch("");
}

function handleEat(e) {
  const data = {
    devoured: e.target.closest("tr").children[1].textContent === "Nope" ? 1 : 0
  };
  fetch(`/burgers/${e.target.dataset.id}/eat`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
  })
    .then(res => res.text())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
}
