
#-----Study 1 - MPT modeling analysis

#load required packages
library(TreeBUGS)
library(readxl)

#input data
data <- read_excel("Data/Study1/Data_Study1.xlsx")


###################################

#-----Test model assumption

#Define data frame
data_smt <- data[,1:9]

#Base model --- Constraint: a=g, DNSG=DNw
base.model <- traitMPT(eqnfile="model/model.eqn",
                     data = data_smt,
                     restrictions = list("a = g", "DNSG = DNw"),
                     modelfilename = "2htsm_predictor.jags",
                     transformedParameters = list("delta_D=DSG-DNSG", "delta_d=dSG-dNSG"),
                     parEstFile = "results_base_model.txt",
                     n.chain = 4, n.iter = 1000000, n.adapt = 500000,
                     n.burnin = 500000, n.thin = 100,
                     ppp=1000)


#Final model --- Constraints: a=g, DNSG=DNw, dSG=dNSG
final.model <- traitMPT(eqnfile="model/model.eqn",
                     data = data_smt,
                     restrictions = list("a = g", "DNSG = DNw", "dSG=dNSG"),
                     modelfilename = "2htsm_predictor.jags",
                     parEstFile = "results_final_model.txt",
                     n.chain = 4, n.iter = 1000000, n.adapt = 500000,
                     n.burnin = 500000, n.thin = 100,
                     ppp=1000)

###################################

#-----Latent-trait regression

#Define data frame
data_smt <- data[,1:9]
cov.std <- data[,10:11]
colnames(cov.std) <- c("recognition.std", "sharing.std")


#Final model --- Constraints: a=g, DNSG=DNw, dSG=dNSG
#Regression: Emotion recognition
final.model.recognition <- traitMPT(eqnfile="model/model.eqn",
                          data = data_smt,
                          restrictions = list("a = g", "DNSG = DNw", "dSG=dNSG"),
                          modelfilename = "2htsm_predictor.jags",
                          covData = cov.std,
                          predStructure = list("DSG DNSG dSG b g; recognition.std"),
                          parEstFile = "results_final_model_recognition.txt",
                          n.chain = 4, n.iter = 1000000, n.adapt = 500000,
                          n.burnin = 500000, n.thin = 100,
                          ppp=1000)


#Final model --- Constraints: a=g, DNSG=DNw, dSG=dNSG
#Regression: Emotion sharing
final.model.sharing    <- traitMPT(eqnfile="model/model.eqn",
                                   data = data_smt,
                                   restrictions = list("a = g", "DNSG = DNw", "dSG=dNSG"),
                                   modelfilename = "2htsm_predictor.jags",
                                   covData = cov.std,
                                   predStructure = list("DSG DNSG dSG b g; sharing.std"),
                                   parEstFile = "results_final_model_sharing.txt",
                                   n.chain = 4, n.iter = 1000000, n.adapt = 500000,
                                   n.burnin = 500000, n.thin = 100,
                                   ppp=1000)


###################################

#-----Latent-trait regression (with control variables)

#Handle missing data in sex
data[data[,c(1:12)] == 999] <- NA
data <- na.omit(data)

#Define data frame
data_smt <- data[,1:9]
cov.std <- data[,10:12]
colnames(cov.std) <- c("recognition.std", "sharing.std", "sex.std")


#Final model --- Constraints: a=g, DNSG=DNw, dSG=dNSG
#Regression: Emotion recognition with control variables
final.model.recognition.control <- traitMPT(eqnfile="model/model.eqn",
                                           data = data_smt,
                                           restrictions = list("a = g", "DNSG = DNw", "dSG=dNSG"),
                                           modelfilename = "2htsm_predictor.jags",
                                           covData = cov.std,
                                           predStructure = list("DSG DNSG dSG b g; recognition.std sex.std"),
                                           parEstFile = "results_final_model_recognition_control.txt",
                                           n.chain = 4, n.iter = 1000000, n.adapt = 500000,
                                           n.burnin = 500000, n.thin = 100,
                                           ppp=1000)


#Final model --- Constraints: a=g, DNSG=DNw, dSG=dNSG
#Regression: Emotion sharing with control variables
final.model.sharing.control <- traitMPT(eqnfile="model/model.eqn",
                                        data = data_smt,
                                        restrictions = list("a = g", "DNSG = DNw", "dSG=dNSG"),
                                        modelfilename = "2htsm_predictor.jags",
                                        covData = cov.std,
                                        predStructure = list("DSG DNSG dSG b g; sharing.std sex.std"),
                                        parEstFile = "results_final_model_sharing_control.txt",
                                        n.chain = 4, n.iter = 1000000, n.adapt = 500000,
                                        n.burnin = 500000, n.thin = 100,
                                        ppp=1000)












