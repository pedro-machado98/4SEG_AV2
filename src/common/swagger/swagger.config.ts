

const customCss = `
    .topbar{
        animation: navanimation linear both;
        animation-range: 0 300px;
        animation-timeline: scroll(root);
        position: sticky;
        top: 0px;
        z-index: 1
    }
    .topbar-wrapper {
        content: Prueba; color: white;
    }  
    .swagger-ui .opblock .opblock-summary-description { 
        font-weight: 900 
    }
    .description .renderedMarkdown p {
        font-size: 1rem;
    }
    @keyframes navanimation {
        to {
            opacity: 0.9;
            backdrop-filter: blur(10px);
        }
    }
`

const customSiteTitle = "Swagger 4SEG av2";   //add site title to swagger for nice SEO

const customJs = "script url";                  //uncomment this line to add a custom script file
const customJsStr = "alert('prueba')";          //uncomment this line to add a custom script


const swaggerOptions = {
    customCss,
    customSiteTitle,
    // customJs,   //uncomment this line to add a custom script file
    // customJsStr,  //uncomment this line to add a custom script
    swaggerOptions: {
        persistAuthorization: true, // this helps to retain the token even after refreshing the (swagger UI web page)
        // defaultModelsExpandDepth: -1 //uncomment this line to stop seeing the schema on swagger ui

    },
}

const swaggerTitle = "AV2 4SEG"

const swaggerDescription = `
<p>Este swagger de API REST em Nest.js contem registro de usuários, autenticação JWT e rotas protegidas.</p>

<p>A API segue os princípios RESTful, facilitando a integração e interação com diversos aplicativos clientes.</p>

<p>As principais funcionalidades desta API incluem:</p>

<ul>
  <li>Registro e gerenciamento de usuários</li>
  <li>Autenticação baseada em token JWT</li>
  <li>Controle de acesso baseado em funções para rotas protegidas</li>
  <li>Operações CRUD para entidades de usuários</li>
</ul>
`

export {
    swaggerOptions,
    swaggerTitle,
    swaggerDescription
}