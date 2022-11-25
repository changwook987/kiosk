$(() => {
    $('#submit').on('click', () => {
        const form = $('#form')[0]
        const data = new FormData(form)
        $.ajax({
            method: 'post',
            url: '/user/buy',
            data: data,
            contentType: false,
            processData: false,
        }).done((data) => {
            alert('성공적으로 구매되었습니다!')
            document.cookie = 'bag = []'
            location.href = '/'
        }).fail((err) => {
            console.log(err)
        })
    })
})