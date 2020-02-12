import React from 'react'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

const ErrorModal = (error, description) => {
    const { t } = useTranslation()
    let message = null;

    if (error.response && error.response.data.error && error.response.data.error.code) {
        switch (error.response.data.error.code) {
            case 'ERR_STOCKSKU_REMAINING':
                message = t('alert.messages.err_skustock_remaining')
                break;
        }
    }

    return Modal.error({
        title: t('alert.title', {context: 'error'}),
        content: <>
            <p>{ message || description || t('alert.messages.other.description')}</p>
            { error.response ? (<p><small>{t('alert.messages.other.http_error_code', {code: error.response.status})}</small></p>) : null}
        </>,
        okText: t('alert.button.ok')
    })
}

export default ErrorModal
