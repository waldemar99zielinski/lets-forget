export default {
    dialog: {
        changeUsername: {
            title: 'Change username',
            textDefaultUsername: 'Your default username is {{username}}, in order to improve community experience please pick a custom username.',
            inputPlaceholder: 'Username',
            buttons: {
                cancel: 'Cancel',
                submit: 'Update'
            },
            error: {
                required: 'Username is required.',
                lengthMax: 'Username is too long.',
                langthMin: 'Username must contain at least 3 letters.',
                conflict: 'Chosen username already exists.',
                request: 'Something went wrong during rename, please try again later.'
            }
        }
    }
}