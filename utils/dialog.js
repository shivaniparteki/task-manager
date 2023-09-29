
export function showAlert(message){
  let div = document.createElement("div");
  div.className = 'alert alert-success alert-dismissible';
  div.innerHTML = message + `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>`;
  document.querySelector("#alertPlaceholder").appendChild(div);

}