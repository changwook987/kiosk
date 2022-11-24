$(() => {
    $('#submit').on('click', () => {
        const id = $('#input-id').val()
        const pw = $('#input-password').val()
        const rm = $('#check-remember').val()
        $.ajax({
            url: '/auth/login',
            type: 'post',
            data: { id: id, password: pw },
        }).done((data) => {
            if (rm == 'on') localStorage.setItem('kiosk-token', data.token)
            else sessionStorage.setItem('kiosk-token', data.token)
            location.href = '/'
        }).fail((xhr, status, error) => {
            alert(error)
        })
    })
})