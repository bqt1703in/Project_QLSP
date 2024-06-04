// Xử lí bộ lọc
const btnStatus = document.querySelectorAll("[button-status]");
if (btnStatus.length > 0) {
  let url = new URL(window.location.href);
  btnStatus.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}

// Xử lí tìm kiếm
const formSearch = document.querySelector(".form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

// Xử lí phân trang
const pagination = document.querySelectorAll("[button-pagination]");
if (pagination) {
  let url = new URL(window.location.href);
  pagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      console.log(page);
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url;
    });
  });
}

// Xử lí checkbox - checkall
const checkboxMuitl = document.querySelector("[checkbox-multi]");
if (checkboxMuitl) {
  const inputCheckAll = checkboxMuitl.querySelector("input[name='checkall']");
  const inputId = checkboxMuitl.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMuitl.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

// Form Xử lí nhiều sản phẩm
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputsChecked = checkboxMuitl.querySelectorAll(
      "input[name='id']:checked"
    );
    const typeChange = e.target.elements.status.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn chắc chắn muốn xóa các sản phẩm này");
      if (!isConfirm) {
        return;
      }
    }
    if (inputsChecked.length > 0) {
      let ids = [];
      inputsChecked.forEach((input) => {
        let id = input.value;
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      formChangeMulti.querySelector("input[name='ids']").value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một sản phẩm");
    }
  });
}

// Xử lí xem trước ảnh
const uploadImage = document.querySelector("[upload-image]");

if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  const buttonDeleteUploadImage = document.querySelector(
    "[button-delete-upload-image]"
  );

  uploadImageInput.addEventListener("change", (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      buttonDeleteUploadImage.classList.add("d-block");
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });

  if (buttonDeleteUploadImage) {
    buttonDeleteUploadImage.addEventListener("click", () => {
      uploadImageInput.value = "";
      uploadImagePreview.src = "";
      buttonDeleteUploadImage.classList.remove("d-block");
    });
  }
}

// Xử lí xóa hình ảnh upload
