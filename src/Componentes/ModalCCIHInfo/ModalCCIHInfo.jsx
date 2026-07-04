import React from "react";
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModeloH1,
  ModeloLi,
  ModeloP,
  Overlay,
} from "./ModalCCIHInfoStyle";

const ModalCCIHInfo = ({ onclose }) => {
  return (
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h1>sobre</h1>
          <button onClick={onclose}>x</button>
        </ModalHeader>
        <ModalContent>
          <ModeloH1>MRSA (Staphylococcus aureus)</ModeloH1>

          <div>
            <ModeloP>
              É um tipo de bactéria  que se tornou resistente a vários antibióticos comuns, como a meticilina e outros da família da penicilina, tornando as infecções mais difíceis de tratar, , manifestando-se frequentemente como infecções de pele ou, em casos mais graves, pneumonia e outras infecções sistêmicas, sendo contagiosa e comum em ambientes hospitalares.
            </ModeloP>
          </div>
        </ModalContent>
        <ModalContent>
          <ModeloH1>KPC (Klebsiella pneumoniae Carbapenemase) </ModeloH1>

          <div>
            <ModeloP>
              É uma enzima produzida por bactérias, principalmente a Klebsiella pneumoniae, que confere alta resistência a quase todos os antibióticos disponíveis, incluindo carbapenêmicos, tornando infecções hospitalares difíceis de tratar. Esta "superbactéria" é comum em UTIs, transmitida por contato com secreções e exige medidas rigorosas de higienização.
            </ModeloP>
         
          </div>
       
        </ModalContent>
     <ModalContent>
          <ModeloH1>Acinetobacter </ModeloH1>

          <div>
            <ModeloP>
              Podem causar infecções hospitalares oportunistas graves, especialmente por Acinetobacter baumannii. São patógenos de alta resistência a múltiplos antibióticos, incluindo carbapenêmicos, e capacidade de sobreviver em superfícies secas por longos períodos. <br/>
             <strong> Infecções que causa:</strong> Pneumonia (frequentemente associada a ventiladores), infecções na corrente sanguínea, infecções urinárias e em feridas cirúrgicas.
            </ModeloP>
         
          </div>
       
        </ModalContent>
        <ModalContent>
          <ModeloH1>Pseudomonas aeruginosa  </ModeloH1>

          <div>
            <ModeloP>
              É uma bactéria comum em hospitais (nosocomial), causador de infecções graves em pessoas com sistema imunológico comprometido, queimaduras ou doenças crônicas como fibrose cística. <br/>
             <strong>Infecções Comuns:</strong>  Pneumonia (especialmente em pacientes intubados), infecções do trato urinário (cateteres), infecções de feridas (queimaduras) e otite externa.
            </ModeloP>
         
          </div>
       
        </ModalContent>
        <ModalContent>
          <ModeloH1>Clostridioides difficile</ModeloH1>

          <div>
            <ModeloP>
              É uma bactéria que causa diarreia grave e colite (inflamação do cólon), geralmente associada ao uso de antibióticos que desequilibram a flora intestinal. Comum em hospitais e idosos, a infecção pode ser fatal e requer tratamento com antibióticos específicos (como vancomicina) e higienização rigorosa das mãos com água e sabão.
            </ModeloP>
         
          </div>
       
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalCCIHInfo;
