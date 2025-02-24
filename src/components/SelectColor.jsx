import { FormSelect } from "react-bootstrap"

const SelectColor = (props) => {
    console.log(props.selectedValue)
    return (
        <FormSelect value={props.selectedValue} onChange={props.handleInputChange} name="color">
            {props.values.map(([value, text]) =>
                <option key={value} value={value}>
                    {text}
                </option>)
            }
        </FormSelect>
    )
}
export default SelectColor;