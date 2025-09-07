import React from 'react';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Slide } from '@progress/kendo-react-animation';

export const NotiGroup = ({ notis }) => {
    return (
        <NotificationGroup
            style={{
                bottom: 15,
                left: '85%',
                transform: 'translateX(-50%)',
                zIndex: '9999',
            }}
        >
            {notis.map((v, i) => {
                const { isShow, style = 'success', onClose = (f) => f, text } = v;
                return (
                    <Slide key={i} direction={isShow ? 'up' : 'down'}>
                        {isShow && (
                            <Notification
                                type={{
                                    style,
                                    icon: true,
                                }}
                                style={{
                                    width: '350px',
                                    height: 80,
                                    fontSize: '1.4em',
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                                closable={true}
                                onClose={onClose}
                            >
                                <span>{text}</span>
                            </Notification>
                        )}
                    </Slide>
                );
            })}
        </NotificationGroup>
    );
};
