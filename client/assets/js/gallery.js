function createImageElement (data) {
    // Image container
    const imageContainer = document.createElement("div");
    imageContainer.dataset.id = data["id"];
    imageContainer.className = "image";

    // image title
    const header = document.createElement("h2");
    header.textContent = data["title"];
    imageContainer.appendChild(header);

    // Image itself
    const image = document.createElement("img");
    image.src = `data:${data["image_type"]};base64,${data["image_data"]}`;
    image.alt = data["title"];
    imageContainer.appendChild(image);

    // Description paragraph
    const content = document.createElement("p");
    content.textContent = data["description"];
    imageContainer.appendChild(content);

    //Buttons container
    const btnContainer = document.createElement("div");
    btnContainer.className = "btn_container";
    imageContainer.appendChild(btnContainer);

    // Update button
    const updateBtn = document.createElement("button");
    updateBtn.className = "update_btn";
    updateBtn.textContent = "Update";
    updateBtn.addEventListener("click", showUpdateForm);
    btnContainer.appendChild(updateBtn);

    // Update form
    const updateFormTemplate = document.querySelector("#post-image-form").cloneNode(true);
    updateFormTemplate.className = "hide";
    updateFormTemplate.removeAttribute("id");
    updateFormTemplate.querySelector("legend").textContent = "Update your image";
    updateFormTemplate.querySelector("input[type='submit']").value = "Update Image";
    updateFormTemplate.addEventListener("submit", updateImage);
    imageContainer.appendChild(updateFormTemplate);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete_btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteImage);
    btnContainer.appendChild(deleteBtn);

    return imageContainer;
}

document.getElementById("post-image-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        body: form
    }

    const result = await fetch("http://localhost:3000/images", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

async function loadImages () {

    const response = await fetch("http://localhost:3000/images");

    if (response.status == 200) {
        const images = await response.json();
    
        const container = document.getElementById("images");

        images.forEach(i => {
            const element = createImageElement(i);
            container.appendChild(element);
        })
    } else {
        window.location.assign("./index.html");
    }

}

async function deleteImage (e) {
    e.preventDefault();

    const image_id = e.target.parentNode.parentNode.dataset.id;

    const options = {
        method: "DELETE"
    }

    const response = await fetch(`http://localhost:3000/images/${image_id}`, options);

    if (response.status == 204) {
        window.location.reload();
    }
}

function showUpdateForm (e) {
    e.preventDefault();
    e.target.parentNode.nextElementSibling.classList.toggle("hide");
    console.log()
}

async function updateImage (e) {
    e.preventDefault();

    const image_id = e.target.parentNode.dataset.id;
    const form = new FormData(e.target);

    const options = {
        method: "PATCH",
        body: form
    }

    const result = await fetch(`http://localhost:3000/images/${image_id}`, options);

    if (result.status == 200) {
        window.location.reload();
    }
}

loadImages();