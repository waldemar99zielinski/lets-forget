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
        },
        selectDefaultCity: {
            title: 'Default city',
            text: 'Select default city, which will be used to retrieve related offers and places.',
            buttons: {
                cancel: 'Cancel',
                save: 'Save'
            },
            countryLabel: 'Country',
            cityLabel: 'City',
            citySelectDiabled: 'Select country',
            error: {
                request: 'Something went wrong during saving city selection, please try again later'
            }
        }
    },
    profilePage: {
        items: {
            user: {
                title: 'User information',
                emailLabel: 'Email',
                usernameLabel: 'Username'
            },
            security: {
                title: 'Security',
                passwordLabel: 'Password',
                passwordPlaceholder: '**************'
            },
            location: {
                title: 'Location',
                defaultLocationLabel: 'Default location'
            }
        }
    }
}