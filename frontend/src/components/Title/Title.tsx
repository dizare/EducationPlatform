import {Moon, Sun} from '@gravity-ui/icons';
import {Button, Icon, TextInput, Theme, ThemeProvider} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import React, {useState} from 'react';

import axios from 'axios';
import './Title.scss';

const b = block('title');

const DARK = 'dark';
const LIGHT = 'light';
const DEFAULT_THEME = DARK;

export const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

export type AppProps = {
    children: React.ReactNode;
};

export const Title: React.FC<AppProps> = ({}) => {
    const [theme, setTheme] = React.useState<Theme>(DEFAULT_THEME);
    const isDark = theme === DARK;
    const [login, setLogin] = useState({
        Name: '',
        SecondName: '',
        Email: '',
        Password: '',
    });
    const [selected, setSelected] = useState('register');

    const handleSelect = (option: 'register' | 'login') => {
        setSelected(option);
    };
    const fetchData = async () => {
        try {
            console.log(await axios.post('https://localhost:8080/profile', login));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <body>
                <header className={b('header')}>
                    <div className={b('main-header-text')}>Образовательная платформа</div>
                    <div className={b('theme-button')}>
                        <Button
                            size="l"
                            view="outlined"
                            onClick={() => {
                                setTheme(isDark ? LIGHT : DARK);
                            }}
                        >
                            <Icon data={isDark ? Sun : Moon} />
                        </Button>
                    </div>
                </header>
                <div className={b('main-div')}>
                    <div className={b('signup')}>
                        <h1>Добро пожаловать!</h1>
                        <div>
                            <div>
                                <div className={b('button-switch')}>
                                    <Button
                                        size="xl"
                                        view={selected === 'register' ? 'normal' : 'outlined'}
                                        onClick={() => handleSelect('register')}
                                    >
                                        Регистрация
                                    </Button>
                                    <Button
                                        size="xl"
                                        view={selected === 'login' ? 'normal' : 'outlined'}
                                        onClick={() => handleSelect('login')}
                                    >
                                        Вход
                                    </Button>
                                </div>
                                {selected === 'register' ? (
                                    <div className={b('form-main')}>
                                        <form>
                                            <TextInput
                                                className={b('text')}
                                                placeholder="Имя"
                                                value={login.Name}
                                                onChange={(e) =>
                                                    setLogin({...login, Name: e.target.value})
                                                }
                                            ></TextInput>
                                            <TextInput
                                                className={b('text')}
                                                placeholder="Фамилия"
                                                value={login.SecondName}
                                                onChange={(e) =>
                                                    setLogin({...login, SecondName: e.target.value})
                                                }
                                            ></TextInput>
                                            <TextInput
                                                className={b('text')}
                                                placeholder="Почта"
                                                value={login.Email}
                                                onChange={(e) =>
                                                    setLogin({...login, Email: e.target.value})
                                                }
                                            ></TextInput>
                                            <TextInput
                                                className={b('text')}
                                                placeholder="Пароль"
                                                type="password"
                                                value={login.Password}
                                                onChange={(e) =>
                                                    setLogin({...login, Password: e.target.value})
                                                }
                                            ></TextInput>
                                            <div className={b('form-button')}>
                                                <Button size="s" onClick={fetchData}>
                                                    Зарегистрироваться
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <div className={b('form-main')}>
                                        <form>
                                            <TextInput
                                                className={b('text')}
                                                placeholder="Почта"
                                                type="email"
                                                value={login.Email}
                                                onChange={(e) =>
                                                    setLogin({...login, Email: e.target.value})
                                                }
                                            ></TextInput>
                                            <TextInput
                                                className={b('text')}
                                                placeholder="Пароль"
                                                type="password"
                                                value={login.Password}
                                                onChange={(e) =>
                                                    setLogin({...login, Password: e.target.value})
                                                }
                                            ></TextInput>
                                            <div className={b('form-button')}>
                                                <Button
                                                    size="s"
                                                    onClick={fetchData}
                                                    className={b('form-button')}
                                                >
                                                    Войти
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </body>
        </ThemeProvider>
    );
};
