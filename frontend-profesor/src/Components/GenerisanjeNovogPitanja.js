import React , {useState, useRef} from 'react'

export default function GenerisanjeNovogPitanja(props) {
    const [pitanje, setPitanje] = useState('')
    const [odgovor, setOdgovor] = useState('')
    const [odgovori, setOdgovori] = useState([])
    const [IDpitanja, setIDpitanja] = useState(0)
    const [tacanOdgovor, setTacanOdgovor] = useState('')

    const fieldToFocus = useRef(null)

    const {test, setTest} = props


    const handleSubmit = (e) => {
        e.preventDefault();
        if(pitanje.length < 1) {
            alert("Postavite pitanje")
        }else if (odgovori.length < 1){
            alert("Unesite odgovore")
        }else if (tacanOdgovor === ''){
            alert("Izaberite tacan odgovor")
        }
        else {
        setTest({
            ...test,
            pitanja: [...test.pitanja, {pitanje, odgovori, IDpitanja, tacanOdgovor}]
            })

        setPitanje('')
        setOdgovor('')
        setOdgovori([])
        setIDpitanja(IDpitanja+1)
        setTacanOdgovor('')
        }}
    
    const handleAnswerAdd = (e) => {
        e.preventDefault()
        if (odgovor.length < 1){
            alert("Popunite odgovor")
        } else if (odgovori.includes(odgovor))  {
            alert("Odgovor vec postoji")
        }else if (odgovori.length > 9 ) {
            alert("Pitanje ne moze da ima vise od 10 odgovora")
        } else {
        odgovori.push(odgovor)
        setOdgovor('')
        fieldToFocus.current.focus()}


        

    }
    const handleRemoveAnswer = (e, brisi) => {
        e.preventDefault()
        setOdgovori(odgovori.filter(odg => odg !== brisi))
    }


    const handleCorrectAnswer = (e) => {
        setTacanOdgovor(e.target.value)
    }


    const showAnswers = odgovori.map((odg, i) => <li key={odg}> <input type='radio' name='tacanOdgovor' value={odg} onChange={(e) => handleCorrectAnswer(e)} ></input>{odg} <button onClick={(e) => handleRemoveAnswer(e, odg)}>Izbrisi odgovor</button></li>)
    return (
        <form>
            <input type='text' value={pitanje} onChange={(e) => setPitanje(e.target.value)}></input>
            <br></br>
            <input type='text' ref={fieldToFocus} value={odgovor} onChange={(e) => setOdgovor(e.target.value)}></input>
            <button onClick={(e) => handleAnswerAdd(e)} >Dodaj odgovor</button>
            <br></br>
            <ul>
                {showAnswers}
            </ul>
            <br></br>
            <button onClick={(e) => handleSubmit(e)}>Kreiraj pitanje</button>
            <li></li>
        </form>
    )
}
