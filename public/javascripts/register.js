const nicknameTest = (nickname) => {
    const len = nickname.length
    if (5 > len || len > 15) {
        return { err: '아이디는 5-15글자여야 합니다' }
    } else if (/[^A-Za-z0-9]/.test(nickname)) {
        return { err: '아이디에 포함할 수 없는글자가 있습니다.' }
    } else {
        return {}
    }
}
const passwordTest = (password) => {
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(password)) {
        return { err: '비밀번호가 올바르지 않습니다' }
    }
    return {}
}

$(() => {
    $('#submit').on('click', () => {
        const nickname = $('#input-id').val()
        const password = $('#input-password').val()
        const isAdmin = $('#check-admin').is(':checked')
        testRes = nicknameTest(nickname)
        if (testRes.err) {
            $('#input-id').focus()
            alert(testRes.err)
            return
        }
        testRes = passwordTest(password)
        if (testRes.err) {
            $('#input-password').focus()
            alert(testRes.err)
            return
        }
        let url = '/api/user/register'
        if (isAdmin) url += '/admin'
        $.ajax({
            url: url,
            type: 'post',
            data: { id: nickname, password: password }
        }).done((data) => {
            alert('회원가입되었습니다')
            location.href = '/user/login'
        }).fail((xhr, status, error) => {
            alert(error)
        })
    })
})