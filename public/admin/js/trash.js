// Xóa sản phẩm trong thùng rác - Xóa vĩnh viễn
const buttonsDeleted = document.querySelectorAll("[button-deleted]");
if (buttonsDeleted) {
  const formDeleteItem = document.querySelector("#form-deleted-item");
  const path = formDeleteItem.getAttribute("data-path");
  buttonsDeleted.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa không?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}

// Khôi phục sản phẩm đã xóa
const buttonsRestore = document.querySelectorAll("[button-restore]");
if (buttonsRestore.length > 0) {
  const formRestoreItem = document.querySelector("#form-restore-item");
  const path = formRestoreItem.getAttribute("data-path");

  buttonsRestore.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn muốn khôi phục sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        console.log(id);
        const action = `${path}/${id}?_method=PATCH`;
        formRestoreItem.action = action;
        formRestoreItem.submit();
      }
    });
  });
}
