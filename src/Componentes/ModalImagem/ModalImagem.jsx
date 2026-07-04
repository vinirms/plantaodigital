import React, { useState } from 'react'
import {  BtnAnalisar, ContainerImagem, ContainerImagemOverlay, Spinner } from './ModalImagemStyle';
import api from '../../Services/Api';

const ModalImagem = ({
    aberto,
    imagem,
    onClose
    
}) => {
const [analise, setAnalise] = useState(null);
const [carregando, setCarregando] = useState(false);
const [erro, setErro] = useState(null);
const analisarImagem = async () => {
   
        //  console.log(imagem)
    setCarregando(true);
     setErro(null);
    try{

        const {data} = await api.post(`/api/Paciente/Imagem/Analisar/${imagem.id}`);
        setAnalise(data);
        // console.log("e");
   
    }catch(e){

        console.log(e);
    setErro("Não foi possível analisar a imagem. Tente novamente.");
    }finally{
        setCarregando(false);
    }
    

}
    if (!aberto) return null;

    return (

        <ContainerImagemOverlay>
            
            {/* */}

           <ContainerImagem>
            <div className='header'>
                <h3>Detalhe da imagem</h3>
                <button
                className="fechar"
                onClick={onClose}
            >
                ✕
            </button> 
            </div>
                <div>
                <img src={imagem.url}  alt="Imagem da lesão" />
                {imagem.descricao ? (

                    <>
                    <div className='analise'>
                        
                        <h4>Descrição da lesão</h4>
                        
                        <p>{imagem.descricao}</p>

                        <h4>Sugestão de conduta</h4>

                        <p>{imagem.conduta}</p>

                    </div>
                       
                    </>
                ):
                (<>
                
                     <div className='analise'>
                        {erro && <p>{erro}</p>}
                            {!analise && (
                            <>
                            <BtnAnalisar onClick={analisarImagem} disabled={carregando}>
                                {carregando && <Spinner />}
                                {carregando ? "Analisando..." : "Analisar com IA"}
                            </BtnAnalisar><span>EM FASE DE TESTE</span>
                            </>
                            )}
                            
                            {analise != null && (
                                <>
                                   <h4>Descrição da lesão</h4>
                                    <p>{analise.descricaoImg}</p>

                                    <h4>Sugestão de conduta</h4>

                                    <p>{analise.condutaImg}</p>
                                </>
                            )}
                         

                        </div>
                
                </>
            )}
                
                </div>
           </ContainerImagem>
        </ContainerImagemOverlay>

    );

}

export default ModalImagem;