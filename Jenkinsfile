def COLOR_MAP = ['SUCCESS': 'good', 'FAILURE': 'danger', 'UNSTABLE': 'danger', 'ABORTED': 'danger']

pipeline {
    agent any
	
    options {
        timeout(time: 5, unit: 'MINUTES' )
    }

    stages {
	stage('Transfering Files') {
	    steps {
	            sh 'rsync -avz /var/lib/jenkins/workspace/Kanvas-Image-Resizer/ kanvas-image:/home/ubuntu/kanvas-image-resizer/'
               } 
	    }
    
       stage('Starting kanvas-image-resizer') {
	    steps {
                sshagent(['kanvas-image']) {
                    sh 'ssh -tt kanvas-image sudo docker-compose -f kanvas-image-resizer/docker-compose.yml up -d --build'
                }
            }
        }
    }
        post {
           always {
               slackSend channel: '#jenkins',
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}"
            
        }
    }
}
