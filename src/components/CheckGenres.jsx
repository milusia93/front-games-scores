import { FormGroup, FormLabel, FormText, FormCheck } from "react-bootstrap";

const CheckGenres = (props) => {
    

    return (

        <FormGroup className="mb-3">

            <FormLabel>Wybierz gatunki gry</FormLabel>

            <div>
                {props.values.map((genre) =>

                    <FormCheck
                        name="genres"
                        onChange={props.handleInputChange}
                        key={genre}
                        type="checkbox"
                        id={genre}
                        label={genre} />
                )}
            </div>


        </FormGroup>
    )


}

export default CheckGenres;