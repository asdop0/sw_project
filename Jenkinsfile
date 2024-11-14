pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // GitHub에서 코드 클론
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/asdop0/sw_project.git'
            }
        }

        stage('Build and Test sw-test') {
            steps {
                echo 'Building and Testing sw-test...'
                dir('sw-test') {
					sh 'chmod +x ./mvnw'
                    sh './mvnw clean package'
                    sh './mvnw test'
                }
            }
        }

        stage('Deploy sw-test') {
            steps {
                echo 'Deploying sw-test...'
                dir('sw-test') {
                    sh 'java -jar target/*.jar'
                }
            }
        }
    }
}
