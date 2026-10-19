
flowchart TD
    A["Покупатель"] --> B["Сайт Violent Studio"]
    B --> C["Генерация лицензионного ключа"]
    C --> D["Назначение срока действия"]
    D --> E["Привязка к устройству"]
    E --> F["Пользователь вводит ключ"]
    F --> G["Сервер проверяет лицензию"]

    G --> H{"Ключ действителен?"}
    H -->|Да| I{"Срок не истёк?"}
    H -->|Нет| J["Доступ запрещён"]
    I -->|Да| K{"Устройство совпадает?"}
    I -->|Нет| J
    K -->|Да| L["Лицензия активирована"]
    K -->|Нет| J

    L --> M["Доступ к продукту"]
    J --> N["Сообщение об ошибке"]

    P["Админ-панель"] --> Q["Управление лицензиями"]
    P --> R["Управление пользователями"]
    P --> S["Управление продуктами"]
    P --> T["Продление и отзыв ключей"]

    Q -.-> G
    R -.-> G
    T -.-> G

    classDef main fill:#160d2b,stroke:#8b3dff,color:#ffffff,stroke-width:2px
    classDef check fill:#24113d,stroke:#c084fc,color:#ffffff
    classDef error fill:#350b1b,stroke:#ff3366,color:#ffffff
    classDef admin fill:#100d20,stroke:#a855f7,color:#ffffff

    class A,B,C,D,E,F,G,L,M main
    class H,I,K check
    class J,N error
    class P,Q,R,S,T admin
