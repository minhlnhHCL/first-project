import React from 'react'

const FormInput = ({
    inputName,
    inputLabel,
    inputValue,
    inputType = 'text',
    inputError,
    handleChange
}) => {
    return (
        <div className='d-flex-ac mt-32'>
            <label htmlFor={inputName} className="custom-label">
                {inputLabel}
            </label>
            <inpu
                type={inputType}
                className="custom-input"
                id={inputName}
                name={inputName}
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    )
}

export default FormInput