$(() => {
    $('#input-image').on('change', () => {
        const imgFile = $('#input-image').val()
        if (imgFile == "") return
        if (imgFile != null) {
            let file = document.getElementById('input-image').files[0]
            let fileSize = file.size
            if (!imgFile.match(/(.*?)\.(jpg|png)/)) {
                alert('이미지 파일만 업로드 할 수 있습니다')
                document.getElementById('input-image').value = ""
                return false
            }
            if (fileSize > 5 * 1024 * 1024) {
                alert('파일의 크기가 너무 큽니다')
                return false
            }

            const reader = new FileReader()

            reader.onload = (event) => {
                $('#preview').attr('src', event.target.result)
            }

            reader.readAsDataURL(file)
        }
    })
    $('#submit').on('click', () => {
        const form = $('#form')[0]
        const data = new FormData(form)
        $.ajax({
            type: 'post',
            url: '/admin/add-item',
            data: data,
            contentType: false,
            processData: false
        }).done((data) => {
            alert('Uploaded')
            location.href = "/"
        }).fail((err) => {
            console.log(err)
        })
    })
})