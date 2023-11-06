function showImages() {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    document.getElementById('imagePreview').innerHTML=null;
    const selectedImage = imageInput.files
    
    for(let i = 0; i < selectedImage.length; i++)
    {
        const image = document.createElement('img')
        image.src = URL.createObjectURL(selectedImage[i])
        image.style.width = "150px";
        image.style.margin = "3px";
        imagePreview.appendChild(image)
    }
}

function deletePost(postId){
    console.log(postId);
    fetch('/admin/deletePost',{
        method: 'delete',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({postId:postId})
    }).then((res) => res.json())
    .then((resp) =>{
        if(resp.delete){
            location.reload()
        }
        else{
            alert("something went wrong")
        }
    })
}

function logout(){
    localStorage.clear()
    sessionStorage.clear()
    location.assign('/logout')
}

let headers = document.querySelectorAll('header');
headers.forEach(header => {
window.addEventListener('scroll', () =>{
    header.classList.toggle('shadow', window.scrollY > 50);
});
});