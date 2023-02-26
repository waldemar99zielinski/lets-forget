export default {
    dialog: {
        changeUsername: {
            title: 'Zmień nazwę użytkownika',
            textDefaultUsername: 'Twoja domyślna nazwa to {{username}}, w celu poprawienia rozpoznawalności wybierz nazwę indywidualnie.',
            inputPlaceholder: 'Nazwa użytkownika',
            buttons: {
                cancel: 'Anuluj',
                submit: 'Zmień'
            },
            error: {
                required: 'Pole jest obowiązkowe.',
                lengthMax: 'Nazwa jest za długa.',
                langthMin: 'Nazwa musi zawierać conajmniej 3 znaki.',
                conflict: 'Nazwa użytkownika już istnieje.',
                request: 'Coś poszło nie tak podczas zmiany nazwy, spróbuj ponownie poźniej.'
            }
        },
        selectDefaultCity: {
            title: 'Domyślne miasto',
            text: 'Wybierz domyślne miasto, na podstawie którego zostaną dobrane najlepsze oferty i lokale.',
            buttons: {
                cancel: 'Anuluj',
                save: 'Zapisz'
            },
            countryLabel: 'Kraj',
            cityLabel: 'Miasto',
            citySelectDiabled: 'Wybierz kraj',
            error: {
                request: 'Coś poszło nie tak podczas zapisu domyślnego miasta, spróbuj ponownie poźniej.'
            }
        }
    },
    profilePage: {
        items: {
            user: {
                title: 'Infomacje użytkownika',
                emailLabel: 'Email',
                usernameLabel: 'Nazwa użytkownika'
            },
            security: {
                title: 'Bezpieczeństwo',
                passwordLabel: 'Hasło',
                passwordPlaceholder: '**************'
            },
            location: {
                title: 'Lokalizacja',
                defaultLocationLabel: 'Domyślna lokalizacja'
            }
        }
    }
}