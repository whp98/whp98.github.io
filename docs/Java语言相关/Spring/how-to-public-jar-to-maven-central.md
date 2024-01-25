# 如何发布jar包到Maven Central仓库

本文参考
https://blog.csdn.net/u011943534/article/details/120168285

## 1.注册issues.sonatype.org并开工单

https://issues.sonatype.org/secure/Signup!default.jspa

账号注册好之后点击创建，Project选择 社区支持，Issue Type选择New Project

输入你的项目信息即可

需要注意的是公司或者个人的小网站需要创建一个可以验证所有权的dns解析。

如果使用github或gitee会要求创建一个临时空仓库验证账号所有权。

过程中需要和机器人进行对话，所以处理速度还是很快的。

https://issues.sonatype.org/browse/OSSRH-98551 可以查看我的对话

验证所有权之后就可以使用刚注册的用户和密码登录[仓库管理器](https://s01.oss.sonatype.org/)

## 2.使用仓库管理器生成user token

右上角用户名->profile->user token

就可以获取用于发布项目的用户名和密码了。

## 3.设置windows的opengpg

下载
https://gpg4win.org/thanks-for-download.html
直接安装

输入以下命令生成gpg密钥对

```powershell
gpg --gen-key
# 生成完毕后可以使用查看8位数的密钥ID
gpg --list-keys --keyid-format short
# 导出gradle签名使用的私钥文件
gpg --export-secret-keys -o X:\MY_PGP\secring.gpg
```

## 4.设置gradle项目的脚本

build.gradle
```groovy
plugins {
    id 'java-library'
    id 'maven-publish'
    id 'signing'
}

group = 'io.github.whp98'
version = '1.1.9'

repositories {
    mavenLocal()
    mavenCentral()
}
def getRepositoryUsername() {
    return hasProperty("sonatypeUsername") ? sonatypeUsername : ""
}

def getRepositoryPassword() {
    return hasProperty("sonatypePassword") ? sonatypePassword : ""
}

dependencies {
    implementation('org.tomlj:tomlj:1.1.0')
    compileOnly("org.springframework.boot:spring-boot:2.7.18")
    testImplementation("org.springframework.boot:spring-boot-starter-test:2.7.18")
    implementation("com.google.code.findbugs:annotations:3.0.1")
}
tasks.withType(JavaCompile).configureEach {
    options.encoding = "UTF-8"
}
tasks.withType(Javadoc).configureEach {
    options.encoding = "UTF-8"
}
test {
    useJUnitPlatform()
}
jar {
    enabled = true
    archiveClassifier = '' //jar包名禁止生成plain
}
tasks.register('sourcesJar', Jar) {
    from sourceSets.main.allJava
    archiveClassifier = 'sources'
}
tasks.register('javadocJar', Jar) {
    from javadoc
    archiveClassifier = 'javadoc'
}
//java {
//    withJavadocJar()
//    withSourcesJar()
//}
sourceSets.main.resources.srcDirs = ["src/main/java", "src/main/resources"]
publishing {
    publications {
        mavenJava(MavenPublication) {
            artifactId = 'tomlj-spring-boot-starter'
            from components.java
            artifact sourcesJar
            artifact javadocJar
            pom {
                name = 'tomlj-spring-boot-starter'
                description = 'tomlj-spring-boot-starter'
                url = 'https://github.com/whp98/tomlj-spring-boot-starter'
                licenses {
                    license {
                        name = 'The MIT License (MIT)'
                        url = 'https://opensource.org/license/mit/'
                    }
                }
                developers {
                    developer {
                        id = 'whp98'
                        name = 'whp98'
                        email = 'whp98@foxmail.com'
                    }
                }
                scm {
                    connection = 'scm:git:https://github.com/whp98/tomlj-spring-boot-starter.git'
                    developerConnection = 'scm:git:https://github.com/whp98/tomlj-spring-boot-starter.git'
                    url = 'https://github.com/whp98/tomlj-spring-boot-starter'
                }
            }
        }
    }
    // 定义发布到哪里
    repositories {
        maven {
            name 'maven-center'
            url "https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/"
            credentials {
                username = getRepositoryUsername()
                password = getRepositoryPassword()
            }
        }
    }
}

signing {
    required { gradle.taskGraph.hasTask("publish") }
    sign publishing.publications.mavenJava
}
test {
    useJUnitPlatform()
}
javadoc {
    if (JavaVersion.current().isJava9Compatible()) {
        options.addBooleanOption('html5', true)
    }
}
```
密码和账号设置单独放到配置文件中
gradle.properties
```properties
# 签名密钥ID
signing.keyId=XXXXXXXX
# 签名密钥密码
signing.password=XXXXXX
# pgp私钥路径
signing.secretKeyRingFile=X:\\MY_PGP\\secring.gpg
# sonatypeUserToken
sonatypeUsername=xxx
sonatypePassword=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 5.执行gradle publish任务进行发布

执行任务后jar包会自动签名和发布

## 6.仓库管理界面点击关闭和发布

进入stagingProfiles

https://s01.oss.sonatype.org/#stagingProfiles

选中刚刚发布的jar包,点击Close关闭,检查完毕后再选中点击Release进行发布

点击release之后预计两个小时内就会同步到中央仓库中

https://repo.maven.apache.org/maven2/io/github/whp98/tomlj-spring-boot-starter/

## 7.maven central公告迁移到全新的central.sonatype.org

https://central.sonatype.org/register/legacy/

https://central.sonatype.org/register/central-portal/

以上页面说2024-02-01之后注册工作会在新的页面进行，原因是jira那边要停止维护。以后的注册流程可能会简化。
