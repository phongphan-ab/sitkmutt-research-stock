import React from 'react'
import { Modal } from 'antd'
import i18next from 'i18next';

const ErrorModal = (error, description) => {
    let message = null;

    if (error.response && error.response.data.error && error.response.data.error.code) {
        switch (error.response.data.error.code) {
            case 'ERR_STOCKSKU_REMAINING':
                message = i18next.t('alert.messages.err_skustock_remaining')
                break;
        }
    }

    return Modal.error({
        title: i18next.t('alert.title', {context: 'error'}),
        content: <>
            <p>{ message || description || i18next.t('alert.messages.other.description')}</p>
            { error.response ? (<p><small>{i18next.t('alert.messages.other.http_error_code', {code: error.response.status})}</small></p>) : null}
        </>,
        okText: i18next.t('alert.button.ok')
    })
}

export default ErrorModal
