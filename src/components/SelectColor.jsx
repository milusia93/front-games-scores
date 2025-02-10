import { FormSelect } from "react-bootstrap"

const SelectColor = (props) => {
    return (
        <FormSelect value={props.selectedValue} onChange={props.handleChangeColor}>
            {props.values.map(([value, text]) =>
                <option key={value} value={value}>
                    {text}
                </option>)
            }
        </FormSelect>
    )
}
export default SelectColor;