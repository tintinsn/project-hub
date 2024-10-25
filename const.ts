import { Project } from "./types";

interface Tool {
  value: string;
  label: string;
}

export const frontEndTechnologies: Tool[] = [
  { value: "html5", label: "HTML" },
  { value: "css3", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "reactjs", label: "React" },
  { value: "vuejs", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "redux", label: "Redux" },
  { value: "mobx", label: "MobX" },
  { value: "contextApi", label: "Context API" },
  { value: "bootstrap", label: "Bootstrap" },
  { value: "tailwindcss", label: "Tailwind CSS" },
  { value: "sass", label: "Sass" },
  { value: "reactRouter", label: "React Router" },
  { value: "vueRouter", label: "Vue Router" },
  { value: "angularRouter", label: "Angular Router" },
  { value: "formik", label: "Formik" },
  { value: "reactHookForm", label: "React Hook Form" },
];

export const backEndTechnologies: Tool[] = [
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "go", label: "Go (Golang)" },
  { value: "rust", label: "Rust" },
  { value: "kotlin", label: "Kotlin" },
  { value: "express", label: "Express" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "springBoot", label: "Spring Boot" },
  { value: "aspnet", label: "ASP.NET" },
  { value: "rails", label: "Ruby on Rails" },
  { value: "laravel", label: "Laravel" },
  { value: "sequelize", label: "Sequelize" },
  { value: "typeOrm", label: "TypeORM" },
  { value: "hibernate", label: "Hibernate" },
  { value: "entityFramework", label: "Entity Framework" },
  { value: "activeRecord", label: "Active Record" },
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "sqlite", label: "SQLite" },
  { value: "sqlServer", label: "Microsoft SQL Server" },
  { value: "mongodb", label: "MongoDB" },
  { value: "cassandra", label: "Cassandra" },
  { value: "couchdb", label: "CouchDB" },
  { value: "firebase", label: "Firebase" },
];

export const devOpsTechnologies: Tool[] = [
  { value: "git", label: "Git" },
  { value: "github", label: "GitHub" },
  { value: "gitlab", label: "GitLab" },
  { value: "bitbucket", label: "Bitbucket" },
  { value: "jenkins", label: "Jenkins" },
  { value: "travis", label: "Travis CI" },
  { value: "circleci", label: "CircleCI" },
  { value: "githubActions", label: "GitHub Actions" },
  { value: "gitlabCi", label: "GitLab CI" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "dockerCompose", label: "Docker Compose" },
  { value: "aws", label: "AWS (Amazon Web Services)" },
  { value: "gcp", label: "Google Cloud Platform (GCP)" },
  { value: "azure", label: "Microsoft Azure" },
  { value: "digitalOcean", label: "DigitalOcean" },
  { value: "terraform", label: "Terraform" },
  { value: "ansible", label: "Ansible" },
  { value: "cloudFormation", label: "CloudFormation" },
];

export const testingTechnologies: Tool[] = [
  { value: "jest", label: "Jest" },
  { value: "mocha", label: "Mocha" },
  { value: "junit", label: "JUnit" },
  { value: "nunit", label: "NUnit" },
  { value: "cypress", label: "Cypress" },
  { value: "selenium", label: "Selenium" },
  { value: "testcafe", label: "TestCafe" },
  { value: "puppeteer", label: "Puppeteer" },
  { value: "jmeter", label: "JMeter" },
  { value: "locust", label: "Locust" },
];

export const monitoringTechnologies: Tool[] = [
  { value: "prometheus", label: "Prometheus" },
  { value: "grafana", label: "Grafana" },
  { value: "newRelic", label: "New Relic" },
  { value: "datadog", label: "Datadog" },
];

export const loggingTechnologies: Tool[] = [
  { value: "elk", label: "ELK Stack (Elasticsearch, Logstash, Kibana)" },
  { value: "splunk", label: "Splunk" },
  { value: "loggly", label: "Loggly" },
];

export const securityTechnologies: Tool[] = [
  { value: "owaspZap", label: "OWASP ZAP" },
  { value: "burpSuite", label: "Burp Suite" },
  { value: "oauth", label: "OAuth" },
  { value: "jwt", label: "JWT (JSON Web Tokens)" },
  { value: "auth0", label: "Auth0" },
  { value: "firebaseAuth", label: "Firebase Authentication" },
];

export const otherEssentialTools: Tool[] = [
  { value: "npm", label: "npm (Node Package Manager)" },
  { value: "yarn", label: "Yarn" },
  { value: "pip", label: "pip (Python)" },
  { value: "maven", label: "Maven" },
  { value: "gradle", label: "Gradle" },
  { value: "webpack", label: "Webpack" },
  { value: "parcel", label: "Parcel" },
  { value: "vite", label: "Vite" },
  { value: "gulp", label: "Gulp" },
  { value: "postman", label: "Postman" },
  { value: "insomnia", label: "Insomnia" },
  { value: "vscode", label: "Visual Studio Code" },
  { value: "intellij", label: "IntelliJ IDEA" },
  { value: "pycharm", label: "PyCharm" },
  { value: "eclipse", label: "Eclipse" },
  { value: "sublimeText", label: "Sublime Text" },
  { value: "slack", label: "Slack" },
  { value: "microsoftTeams", label: "Microsoft Teams" },
  { value: "trello", label: "Trello" },
  { value: "jira", label: "Jira" },
];
export const technologies: Tool[] = [
  { value: "html5", label: "HTML" },
  { value: "css3", label: "CSS" },
  { value: "js", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "reactjs", label: "React" },
  { value: "vuejs", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "sveltejs", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "redux", label: "Redux" },
  { value: "bootstrap5", label: "Bootstrap" },
  { value: "tailwindcss", label: "Tailwind CSS" },
  { value: "sass", label: "Sass" },
  { value: "reactrouter", label: "React Router" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "go", label: "Go (Golang)" },
  { value: "rust", label: "Rust" },
  { value: "kotlin", label: "Kotlin" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "spring", label: "Spring Boot" }, // springBoot not found, corrected to spring
  { value: "aspnet", label: "ASP.NET" }, // aspnet not found
  { value: "rails", label: "Ruby on Rails" },
  { value: "laravel", label: "Laravel" },
  // { value: "typeOrm", label: "TypeORM" }, // typeOrm not found
  // { value: "hibernate", label: "Hibernate" }, // hibernate not found
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  // { value: "sqlite", label: "SQLite" }, // sqlite not found
  // { value: "sqlServer", label: "Microsoft SQL Server" }, // sqlServer not found
  { value: "mongodb", label: "MongoDB" },
  // { value: "cassandra", label: "Cassandra" }, // cassandra not found
  { value: "couchdb", label: "CouchDB" },
  { value: "firebase", label: "Firebase" },
  { value: "git", label: "Git" },
  { value: "github", label: "GitHub" },
  { value: "gitlab", label: "GitLab" },
  { value: "bitbucket", label: "Bitbucket" },
  // { value: "jenkins", label: "Jenkins" }, // jenkins not found
  // { value: "travis", label: "Travis CI" }, // travis not found
  { value: "circleci", label: "CircleCI" },
  // { value: "githubActions", label: "GitHub Actions" }, // githubActions not found
  // { value: "gitlabCi", label: "GitLab CI" }, // gitlabCi not found
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  // { value: "dockerCompose", label: "Docker Compose" }, // dockerCompose not found
  { value: "aws", label: "AWS (Amazon Web Services)" },
  // { value: "gcp", label: "Google Cloud Platform (GCP)" }, // gcp not found
  { value: "azure", label: "Microsoft Azure" },
  // { value: "digitalOcean", label: "DigitalOcean" }, // digitalOcean not found
  // { value: "terraform", label: "Terraform" }, // terraform not found
  // { value: "ansible", label: "Ansible" }, // ansible not found
  // { value: "cloudFormation", label: "CloudFormation" }, // cloudFormation not found
  { value: "jest", label: "Jest" },
  // { value: "mocha", label: "Mocha" }, // mocha not found
  // { value: "junit", label: "JUnit" }, // junit not found
  // { value: "nunit", label: "NUnit" }, // nunit not found
  { value: "cypress", label: "Cypress" },
  // { value: "selenium", label: "Selenium" }, // selenium not found
  // { value: "testcafe", label: "TestCafe" }, // testcafe not found
  // { value: "puppeteer", label: "Puppeteer" }, // puppeteer not found
  // { value: "jmeter", label: "JMeter" }, // jmeter not found
  // { value: "locust", label: "Locust" }, // locust not found
  // { value: "prometheus", label: "Prometheus" }, // prometheus not found
  { value: "grafana", label: "Grafana" },
  // { value: "newRelic", label: "New Relic" }, // newRelic not found
  { value: "datadog", label: "Datadog" },
  // { value: "elk", label: "ELK Stack (Elasticsearch, Logstash, Kibana)" }, // elk not found
  // { value: "splunk", label: "Splunk" }, // splunk not found
  // { value: "loggly", label: "Loggly" }, // loggly not found
  // { value: "owaspZap", label: "OWASP ZAP" }, // owaspZap not found
  // { value: "burpSuite", label: "Burp Suite" }, // burpSuite not found
  { value: "oauth", label: "OAuth" },
  { value: "jwt", label: "JWT (JSON Web Tokens)" },
  { value: "auth0", label: "Auth0" },
  // { value: "firebaseAuth", label: "Firebase Authentication" }, // firebaseAuth not found
  { value: "npm", label: "npm (Node Package Manager)" },
  // { value: "yarn", label: "Yarn" }, // yarn not found
  // { value: "pip", label: "pip (Python)" }, // pip not found
  // { value: "maven", label: "Maven" }, // maven not found
  // { value: "gradle", label: "Gradle" }, // gradle not found
  { value: "webpack", label: "Webpack" },
  // { value: "parcel", label: "Parcel" }, // parcel not found
  { value: "vitejs", label: "Vite" },
  { value: "gulp", label: "Gulp" },
  { value: "postman", label: "Postman" },
  { value: "insomnia", label: "Insomnia" },
  { value: "vscode", label: "Visual Studio Code" },
  // { value: "intellij", label: "IntelliJ IDEA" }, // intellij not found
  // { value: "pycharm", label: "PyCharm" }, // pycharm not found
  // { value: "eclipse", label: "Eclipse" }, // eclipse not found
  // { value: "sublimeText", label: "Sublime Text" }, // sublimeText not found
  { value: "slack", label: "Slack" },
  // { value: "microsoftTeams", label: "Microsoft Teams" }, // microsoftTeams not found
  // { value: "trello", label: "Trello" }, // trello not found
  { value: "jira", label: "Jira" },
  { value: "chakraui", label: "ChakraUI" },
  { value: "prisma", label: "Prisma" },
];

// export const technologies: Tool[] = [
//   { value: "html5", label: "HTML" },
//   { value: "css3", label: "CSS" },
//   { value: "js", label: "JavaScript" },
//   { value: "typescript", label: "TypeScript" },
//   { value: "reactjs", label: "React" },
//   { value: "vuejs", label: "Vue.js" },
//   { value: "angular", label: "Angular" },
//   { value: "sveltejs", label: "Svelte" },
//   { value: "nextjs", label: "Next.js" },
//   { value: "nuxtjs", label: "Nuxt.js" },
//   { value: "redux", label: "Redux" },
//   { value: "bootstrap5", label: "Bootstrap" },
//   { value: "tailwindcss", label: "Tailwind CSS" },
//   { value: "sass", label: "Sass" },
//   { value: "reactrouter", label: "React Router" },
//   { value: "nodejs", label: "Node.js" },
//   { value: "python", label: "Python" },
//   { value: "java", label: "Java" },
//   { value: "csharp", label: "C#" },
//   { value: "ruby", label: "Ruby" },
//   { value: "php", label: "PHP" },
//   { value: "go", label: "Go (Golang)" },
//   { value: "rust", label: "Rust" },
//   { value: "kotlin", label: "Kotlin" },
//   { value: "django", label: "Django" },
//   { value: "flask", label: "Flask" },
//   { value: "spring", label: "Spring Boot" },
//   { value: "aspnet", label: "ASP.NET" },
//   { value: "rails", label: "Ruby on Rails" },
//   { value: "laravel", label: "Laravel" },
//   { value: "typeOrm", label: "TypeORM" },
//    { value: "hibernate", label: "Hibernate" },
//   { value: "mysql", label: "MySQL" },
//   { value: "postgresql", label: "PostgreSQL" },
//    { value: "sqlite", label: "SQLite" },
//    { value: "sqlServer", label: "Microsoft SQL Server" },
//   { value: "mongodb", label: "MongoDB" },
//    { value: "cassandra", label: "Cassandra" },
//   { value: "couchdb", label: "CouchDB" },
//   { value: "firebase", label: "Firebase" },
//   { value: "git", label: "Git" },
//   { value: "github", label: "GitHub" },
//   { value: "gitlab", label: "GitLab" },
//   { value: "bitbucket", label: "Bitbucket" },
//   { value: "jenkins", label: "Jenkins" },
//   { value: "travis", label: "Travis CI" },
//   { value: "circleci", label: "CircleCI" },
//   { value: "githubActions", label: "GitHub Actions" },
//   { value: "gitlabCi", label: "GitLab CI" },
//   { value: "docker", label: "Docker" },
//   { value: "kubernetes", label: "Kubernetes" },
//   { value: "dockerCompose", label: "Docker Compose" },
//   { value: "aws", label: "AWS (Amazon Web Services)" },
//   { value: "gcp", label: "Google Cloud Platform (GCP)" },
//   { value: "azure", label: "Microsoft Azure" },
//   { value: "digitalOcean", label: "DigitalOcean" },
//   { value: "terraform", label: "Terraform" },
//   { value: "ansible", label: "Ansible" },
//   { value: "cloudFormation", label: "CloudFormation" },
//   { value: "jest", label: "Jest" },
//   { value: "mocha", label: "Mocha" },
//   { value: "junit", label: "JUnit" },
//   { value: "nunit", label: "NUnit" },
//   { value: "cypress", label: "Cypress" },
//   { value: "selenium", label: "Selenium" },
//   { value: "testcafe", label: "TestCafe" },
//   { value: "puppeteer", label: "Puppeteer" },
//   { value: "jmeter", label: "JMeter" },
//   { value: "locust", label: "Locust" },
//   { value: "prometheus", label: "Prometheus" },
//   { value: "grafana", label: "Grafana" },
//   { value: "newRelic", label: "New Relic" },
//   { value: "datadog", label: "Datadog" },
//   { value: "elk", label: "ELK Stack (Elasticsearch, Logstash, Kibana)" },
//   { value: "splunk", label: "Splunk" },
//   { value: "loggly", label: "Loggly" },
//   { value: "owaspZap", label: "OWASP ZAP" },
//   { value: "burpSuite", label: "Burp Suite" },
//   { value: "oauth", label: "OAuth" },
//   { value: "jwt", label: "JWT (JSON Web Tokens)" },
//   { value: "auth0", label: "Auth0" },
//   { value: "firebaseAuth", label: "Firebase Authentication" },
//   { value: "npm", label: "npm (Node Package Manager)" },
//   { value: "yarn", label: "Yarn" },
//   { value: "pip", label: "pip (Python)" },
//   { value: "maven", label: "Maven" },
//   { value: "gradle", label: "Gradle" },
//   { value: "webpack", label: "Webpack" },
//   { value: "parcel", label: "Parcel" },
//   { value: "vitejs", label: "Vite" },
//   { value: "gulp", label: "Gulp" },
//   { value: "postman", label: "Postman" },
//   { value: "insomnia", label: "Insomnia" },
//   { value: "vscode", label: "Visual Studio Code" },
//   { value: "intellij", label: "IntelliJ IDEA" },
//   { value: "pycharm", label: "PyCharm" },
//   { value: "eclipse", label: "Eclipse" },
//   { value: "sublimeText", label: "Sublime Text" },
//   { value: "slack", label: "Slack" },
//   { value: "microsoftTeams", label: "Microsoft Teams" },
//   { value: "trello", label: "Trello" },
//   { value: "jira", label: "Jira" },
//   { value: "chakraui", label: "ChakraUI" },
//   { value: "prisma", label: "Prisma" },
// ];
