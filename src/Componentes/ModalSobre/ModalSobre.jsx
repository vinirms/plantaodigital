import React from "react";
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModeloH1,
  ModeloLi,
  ModeloP,
  ModeloSpan,
  Overlay,
} from "./ModalSobreStyle";

const ModalSobre = ({ onclose }) => {
  return (
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h1>sobre</h1>
          <button onClick={onclose}>x</button>
        </ModalHeader>
        <ModalContent>
          <ModeloH1>Apresentação da Plataforma</ModeloH1>

          <div>
            <ModeloP>
              A plataforma é a versão web de um software desenvolvido para
              apoiar a segurança do paciente, melhorar a comunicação entre
              equipes e facilitar o trabalho da enfermagem. Com acesso rápido,
              seguro e multiplataforma, o sistema padroniza a passagem de
              plantão, reduz riscos assistenciais, organiza informações críticas
              e contribui para uma assistência mais segura, eficiente e
              sustentável.
              <br />- A solução utiliza tecnologia segura, acessível e está em
              conformidade com a Lei Geral de Proteção de Dados (LGPD). Este
              sistema possui registro de software junto ao INPI, conforme a
              legislação brasileira de direitos autorais.
            </ModeloP>
          </div>
        </ModalContent>
        <ModalContent>
          <ModeloH1>Segurança e Conformidade com a LGPD</ModeloH1>

          <div>
            <ModeloP>
              Na área da saúde, as informações dos pacientes são consideradas
              dados sensíveis. Por isso, todo o uso dos dados na plataforma é
              feito exclusivamente para fins assistenciais, sem qualquer
              utilização comercial ou indevida.
            </ModeloP>
            <ModeloP>
              O acesso é restrito a profissionais autorizados, por meio de login
              individual, garantindo que cada usuário visualize apenas as
              informações necessárias para o seu trabalho.
            </ModeloP>
            <ModeloP>
              As informações tratadas pela plataforma são dados sensíveis da
              área da saúde. Por isso, o sistema foi projetado para garantir:
            </ModeloP>
          </div>
          <ModeloLi>Acesso restrito a profissionais autorizados;</ModeloLi>
          <ModeloLi>Controle de login por usuário;</ModeloLi>
          <ModeloLi>Uso exclusivo dos dados para fins assistenciais;</ModeloLi>
          <ModeloLi>
            Conformidade com a LGPD e boas práticas de segurança da informação.
          </ModeloLi>
        </ModalContent>
        <ModalContent>
          <ModeloH1>
            Acesso Multiplataforma | Mobilidade e Agilidade no Atendimento
          </ModeloH1>

          <div>
            <ModeloP>
              O sistema pode ser acessado via computador, tablet ou celular,
              permitindo que os profissionais consultem e registrem informações
              diretamente durante a visita à beira leito, sem depender de
              formulários físicos.
            </ModeloP>
          </div>
          <ModeloLi>Uso em computador e celular</ModeloLi>
          <ModeloLi>Registro à beira leito</ModeloLi>
          <ModeloLi>Menos dependência de papel</ModeloLi>
          <ModeloLi>Informação disponível onde o profissional está</ModeloLi>
        </ModalContent>

        <ModalContent>
          <ModeloH1>Agilidade no registro das informações</ModeloH1>
          <ModeloLi>Menos retrabalho e anotações repetidas</ModeloLi>
          <ModeloLi>Menor custo com impressões e formulários;</ModeloLi>
          <ModeloLi>Facilidade de consulta durante o plantão</ModeloLi>
          <ModeloLi>Organização do cuidado por setor</ModeloLi>
        </ModalContent>

        <ModalContent>
          <ModeloH1>Banco de Dados Online Seguro</ModeloH1>
          <div>
            <ModeloP>
              Os dados são armazenados em banco de dados online, com controle de
              acesso e monitoramento, o que reduz riscos de perda de informações
              e garante disponibilidade contínua dos dados, mesmo em ambientes
              com múltiplos setores e usuários.
            </ModeloP>
          </div>
        </ModalContent>

        <ModalContent>
          <ModeloH1>Criptografia e Proteção das Informações</ModeloH1>

          <div>
            <ModeloP>
              A plataforma utiliza criptografia para proteger as informações
              durante o acesso e a transmissão dos dados, garantindo
              confidencialidade e integridade das informações.
            </ModeloP>
          </div>
        </ModalContent>

        <ModalContent>
          <ModeloH1>Redução de Custos e Sustentabilidade</ModeloH1>

          <div>
            <ModeloP>
              Por ser totalmente digital, a plataforma contribui para:
            </ModeloP>
          </div>
          <ModeloLi>Redução significativa do uso de papel;</ModeloLi>
          <ModeloLi>Menor custo com impressões e formulários;</ModeloLi>
          <ModeloLi>Diminuição de erros de transcrição;</ModeloLi>
          <ModeloLi>Maior agilidade e padronização das informações.</ModeloLi>
        </ModalContent>

        <ModalContent>
          <ModeloH1>Benefícios para a Instituição</ModeloH1>

          <ModeloLi>Melhoria na comunicação entre equipes;</ModeloLi>
          <ModeloLi>Padronização da passagem de plantão;</ModeloLi>
          <ModeloLi>Aumento da segurança do paciente.</ModeloLi>
          <ModeloLi>
            Mantém a mesma linguagem e estrutura de informações.
          </ModeloLi>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalSobre;
