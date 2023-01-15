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
        }
    }
}