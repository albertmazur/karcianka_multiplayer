<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Pole :atrybut musi zostać zaakceptowane.',
    'accepted_if' => 'Pole :attribute musi zostać zaakceptowane, gdy :other ma wartość :value.',
    'active_url' => 'Pole :attribute musi być poprawnym adresem URL.',
    'after' => 'Pole :attribute musi zawierać datę po :date.',
    'after_or_equal' => 'Pole :attribute musi być datą późniejszą lub równą :date.',
    'alpha' => 'Pole :attribute może zawierać tylko litery.',
    'alpha_dash' => 'Pole :attribute może zawierać wyłącznie litery, cyfry, myślniki i podkreślenia.',
    'alpha_num' => 'Pole :attribute może zawierać tylko litery i cyfry.',
    'array' => 'Pole :attribute musi być tablicą.',
    'ascii' => 'Pole :attribute może zawierać wyłącznie jednobajtowe znaki alfanumeryczne i symbole.',
    'before' => 'Pole :attribute musi zawierać datę poprzedzającą :date.',
    'before_or_equal' => 'Pole :attribute musi być datą wcześniejszą lub równą :date.',
    'between' => [
        'array' => 'Pole :attribute musi zawierać elementy od :min do :max.',
        'file' => 'Pole :attribute musi mieścić się w przedziale od :min do :max kilobajtów.',
        'numeric' => 'Pole :attribute musi mieścić się w przedziale od :min do :max.',
        'string' => 'Pole :attribute musi zawierać znaki od :min do :max.',
    ],
    'boolean' => 'Pole :atrybut musi mieć wartość true lub false.',
    'can' => 'Pole :attribute zawiera nieautoryzowaną wartość.',
    'confirmed' => 'Potwierdzenie pola :attribute nie jest zgodne.',
    'current_password' => 'Hasło jest błędne.',
    'date' => 'Pole :attribute musi być prawidłową datą.',
    'date_equals' => 'Pole :attribute musi być datą równą :date.',
    'date_format' => 'Pole :attribute musi odpowiadać formatowi :format.',
    'decimal' => 'Pole :attribute musi zawierać :decimal miejsca dziesiętne.',
    'declined' => 'Pole :attribute musi zostać odrzucone.',
    'declined_if' => 'Pole :attribute musi zostać odrzucone, gdy :other ma wartość :value.',
    'different' => 'Pole :attribute i :other muszą być różne.',
    'digits' => 'Pole :attribute musi mieć wartość :digits cyfr.',
    'digits_between' => 'Pole :attribute musi zawierać się pomiędzy cyframi :min i :max.',
    'dimensions' => 'Pole :attribute ma nieprawidłowe wymiary obrazu.',
    'distinct' => 'Pole :attribute ma zduplikowaną wartość.',
    'doesnt_end_with' => 'Pole :attribute nie może kończyć się jedną z następujących wartości: :values.',
    'doesnt_start_with' => 'Pole :attribute nie może zaczynać się od jednej z następujących wartości: :values.',
    'email' => 'Pole :attribute musi być prawidłowym adresem e-mail.',
    'ends_with' => 'Pole :attribute musi kończyć się jedną z następujących wartości: :values.',
    'enum' => 'Wybrany atrybut :atrybut jest nieprawidłowy.',
    'exists' => 'Wybrany atrybut :atrybut jest nieprawidłowy.',
    'file' => 'Pole :attribute musi być plikiem.',
    'filled' => 'Pole :atrybut musi mieć wartość.',
    'gt' => [
        'array' => 'Pole :attribute musi zawierać więcej elementów niż :value.',
        'file' => 'Pole :attribute musi być większe niż :value kilobajtów.',
        'numeric' => 'Pole :atrybut musi być większe niż :wartość.',
        'string' => 'Pole :attribute musi mieć więcej znaków niż :value.',
    ],
    'gte' => [
        'array' => 'Pole :attribute musi zawierać elementy :value lub więcej.',
        'file' => 'Pole :attribute musi być większe lub równe :value kilobajtów.',
        'numeric' => 'Pole :attribute musi być większe lub równe :value.',
        'string' => 'Pole :attribute musi być większe lub równe :value znaków.',
    ],
    'image' => 'Pole :attribute musi być obrazem.',
    'in' => 'Wybrany atrybut :atrybut jest nieprawidłowy.',
    'in_array' => 'Pole :attribute musi istnieć w :other.',
    'integer' => 'Pole :atrybut musi być liczbą całkowitą.',
    'ip' => 'Pole :attribute musi być prawidłowym adresem IP.',
    'ipv4' => 'Pole :attribute musi być prawidłowym adresem IPv4.',
    'ipv6' => 'Pole :attribute musi być prawidłowym adresem IPv6.',
    'json' => 'Pole :attribute musi być prawidłowym ciągiem JSON.',
    'lowercase' => 'Pole :attribute musi być pisane małymi literami.',
    'lt' => [
        'array' => 'Pole :attribute musi zawierać mniej niż :value elementów.',
        'file' => 'Pole :attribute musi być mniejsze niż :value kilobajtów.',
        'numeric' => 'Pole :atrybut musi być mniejsze niż :wartość.',
        'string' => 'Pole :attribute musi mieć mniej znaków niż :value.',
    ],
    'lte' => [
        'array' => 'Pole :attribute nie może zawierać więcej niż :value elementów.',
        'file' => 'Pole :attribute musi być mniejsze lub równe :value kilobajtów.',
        'numeric' => 'Pole :attribute musi być mniejsze lub równe :value.',
        'string' => 'Pole :attribute musi być mniejsze lub równe :value znaków.',
    ],
    'mac_address' => 'Pole :attribute musi być prawidłowym adresem MAC.',
    'max' => [
        'array' => 'Pole :attribute nie może zawierać więcej niż :max elementów.',
        'file' => 'Pole :attribute nie może być większe niż :max kilobajtów.',
        'numeric' => 'Pole :attribute nie może być większe niż :max.',
        'string' => 'Pole :attribute nie może być większe niż :max znaków.',
    ],
    'max_digits' => 'Pole :attribute nie może zawierać więcej niż :max cyfr.',
    'mimes' => 'Pole :attribute musi być plikiem typu: :values.',
    'mimetypes' => 'Pole :attribute musi być plikiem typu: :values.',
    'min' => [
        'array' => 'Pole :attribute musi zawierać co najmniej :min elementów.',
        'file' => 'Pole :attribute musi mieć co najmniej :min kilobajtów.',
        'numeric' => 'Pole :attribute musi mieć wartość co najmniej :min.',
        'string' => 'Pole :attribute musi zawierać co najmniej :min znaków.',
    ],
    'min_digits' => 'Pole :attribute musi zawierać co najmniej :min cyfr.',
    'missing' => 'Musi brakować pola :attribute.',
    'missing_if' => 'Pole :attribute musi brakować, gdy :other ma wartość :value.',
    'missing_unless' => 'Pole :attribute musi brakować, chyba że :other to :value.',
    'missing_with' => 'Jeśli występuje :values, musi brakować pola :attribute.',
    'missing_with_all' => 'Pole :attribute musi brakować, jeśli obecne są :values.',
    'multiple_of' => 'Pole :attribute musi być wielokrotnością :value.',
    'not_in' => 'Wybrany atrybut :atrybut jest nieprawidłowy.',
    'not_regex' => 'Format pola :atrybut jest nieprawidłowy.',
    'numeric' => 'Pole :atrybut musi być liczbą.',
    'password' => [
        'letters' => 'Pole :attribute musi zawierać co najmniej jedną literę.',
        'mixed' => 'Pole :attribute musi zawierać co najmniej jedną wielką i jedną małą literę.',
        'numbers' => 'Pole :attribute musi zawierać co najmniej jedną liczbę.',
        'symbols' => 'Pole :attribute musi zawierać co najmniej jeden symbol.',
        'uncompromised' => 'Podany atrybut :attribute pojawił się w wyniku wycieku danych. Proszę wybrać inny :atrybut.',
    ],
    'present' => 'Pole :attribute musi być obecne.',
    'prohibited' => 'Pole :atrybut jest zabronione.',
    'prohibited_if' => 'Pole :attribute jest zabronione, gdy :other ma wartość :value.',
    'prohibited_unless' => 'Pole :attribute jest zabronione, chyba że :other znajduje się w :values.',
    'prohibits' => 'Pole :attribute zabrania obecności :other.',
    'regex' => 'Format pola :atrybut jest nieprawidłowy.',
    'required' => 'Pole :atrybut jest wymagane.',
    'required_array_keys' => 'Pole :attribute musi zawierać wpisy dla: :values.',
    'required_if' => 'Pole :atrybut jest wymagane, gdy :inne ma wartość :wartość.',
    'required_if_accepted' => 'Pole :attribute jest wymagane, gdy akceptowane jest :other.',
    'required_unless' => 'Pole :attribute jest wymagane, chyba że :other znajduje się w :values.',
    'required_with' => 'Pole :attribute jest wymagane, gdy występuje :values.',
    'required_with_all' => 'Pole :attribute jest wymagane, gdy obecne są :values.',
    'required_without' => 'Pole :attribute jest wymagane, jeśli nie ma :values.',
    'required_without_all' => 'Pole :attribute jest wymagane, jeśli nie ma żadnej z wartości :value.',
    'same' => 'Pole :atrybut musi pasować do pola :inne.',
    'size' => [
        'array' => 'Pole :attribute musi zawierać elementy :size.',
        'file' => 'Pole :attribute musi mieć wartość :size kilobajtów.',
        'numeric' => 'Pole :attribute musi mieć wartość :size.',
        'string' => 'Pole :attribute musi zawierać :size znaków.',
    ],
    'starts_with' => 'Pole :attribute musi zaczynać się od jednej z następujących wartości: :values.',
    'string' => 'Pole :attribute musi być ciągiem znaków.',
    'timezone' => 'Pole :attribute musi być prawidłową strefą czasową.',
    'unique' => ':atrybut został już zajęty.',
    'uploaded' => 'Nie udało się przesłać atrybutu :attribute.',
    'uppercase' => 'Pole :atrybut musi być pisane wielkimi literami.',
    'url' => 'Pole :attribute musi być prawidłowym adresem URL.',
    'ulid' => 'Pole :attribute musi być prawidłowym identyfikatorem ULID.',
    'uuid' => 'Pole :attribute musi być prawidłowym identyfikatorem UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'Niestandardowa wiadomość',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
