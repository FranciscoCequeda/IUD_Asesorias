pipeline {
    agent any 
    stages {
        stage('Build') {
            steps {
                echo 'Etapa sin implementacion'
            }
        }
        stage('Test') {
            steps {
                echo 'Etapa sin implementacion'
            }
        }
        stage('Deploy') {
            steps {
                sh 'IUD_Asesorias_Micro/docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }
}