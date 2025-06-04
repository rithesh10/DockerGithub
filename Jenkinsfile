pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('452dfbf2-c41f-4255-ab04-6a612920ca91')
        BACKEND_IMAGE = 'rithesh10/my-backend:v1'
        FRONTEND_IMAGE = 'rithesh10/my-frontend:v1'
    }

    stages {
       stage('Checkout Code') {
  steps {
    git branch: 'main', url: 'https://github.com/rithesh10/DockerGithub.git'
  }
}


        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh '''
                    echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin
                    docker push $BACKEND_IMAGE
                    docker push $FRONTEND_IMAGE
                '''
            }
        }
    }
}
