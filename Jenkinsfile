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
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }
}