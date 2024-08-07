rm(list = ls())
library(tidyverse)
library(zoo)
### Get the directory ofcurrent script (only for r-studio)
curWD <- dirname(rstudioapi::getSourceEditorContext()$path) 
setwd(curWD)
setwd("../")
### Input all rowdata
file_list <- list.files("Data",pattern=".csv", full.names = TRUE)
### combine data and delete the meesy column
D1 <- do.call("rbind",lapply(file_list, read.csv, header = TRUE, fileEncoding="latin1", stringsAsFactors = FALSE, na.strings = "")) %>%
  subset(select = -c(Words, Words2, Block1_Old, Block2_Old, Block3_Old, All_Words1, All_Words2, All_Words3))

############    rating part    ############
D1$block_resp_1.keys = na.locf(D1$block_resp_1.keys,na.rm = FALSE)             #add block value

ratedata1 <- D1 %>%
  dplyr::filter(block_resp_1.keys == "1")  %>%                               # filter based on condition 
  dplyr::select(Num_Old1,domain1,valence1,Source_1,block_resp_1.keys,          # select
                words_rating.keys, participant,Age,Sex) %>%  
  dplyr::rename(Stimula_ID = Num_Old1, domain = domain1,                          # rename columns
                valence = valence1, Source = Source_1, rate = words_rating.keys, wordlist = block_resp_1.keys)

ratedata2 <- D1 %>%
  dplyr::filter(block_resp_1.keys == "2") %>%                                  # filter based on condition 
  dplyr::select(Num_Old2,domain2,valence2,Source_2,block_resp_1.keys,          # select
                words_rating.keys, participant,Age,Sex) %>%  
  dplyr::rename(Stimula_ID = Num_Old2, domain = domain2,                          # rename columns
                valence = valence2, Source = Source_2,rate = words_rating.keys, wordlist = block_resp_1.keys)
ratedata3 <- D1 %>%
  dplyr::filter(block_resp_1.keys == "3") %>%                                  # filter based on condition 
  dplyr::select(Num_Old3,domain3,valence3,Source_3,block_resp_1.keys,          # select
                words_rating.keys, participant,Age,Sex) %>%  
  dplyr::rename(Stimula_ID = Num_Old3, domain = domain3,                          # rename columns
                valence = valence3, Source = Source_3,rate = words_rating.keys, wordlist = block_resp_1.keys)
# merge different block in to one dataframe
rate_a <- rbind(ratedata1,ratedata2,ratedata3)
attach(rate_a)
Allratedata = rate_a[order(participant,domain,valence,Source),]
detach(rate_a)

# replace NA value
Allratedata <- Allratedata %>% dplyr::filter(rate != 'NA')
# the code below can be rewritten using tidyverse code, would be much easier.
Allratedata$groupType <- ifelse(Allratedata$domain==1&Allratedata$valence==1&Allratedata$Source=="1","mor_pos_new",
                                ifelse(Allratedata$domain==1&Allratedata$valence==1&Allratedata$Source=="friend","mor_pos_fri",
                                       ifelse(Allratedata$domain==1&Allratedata$valence==1&Allratedata$Source=="self","mor_pos_self",
                                              ifelse(Allratedata$domain==1&Allratedata$valence==2&Allratedata$Source=="1","mor_neg_new",
                                                     ifelse(Allratedata$domain==1&Allratedata$valence==2&Allratedata$Source=="friend","mor_neg_fri",
                                                            ifelse(Allratedata$domain==1&Allratedata$valence==2&Allratedata$Source=="self","mor_neg_self",
                                                                   ifelse(Allratedata$domain==2&Allratedata$valence==1&Allratedata$Source=="1","com_pos_new",
                                                                          ifelse(Allratedata$domain==2&Allratedata$valence==1&Allratedata$Source=="friend","com_pos_fri",
                                                                                 ifelse(Allratedata$domain==2&Allratedata$valence==1&Allratedata$Source=="self","com_pos_self",
                                                                                        ifelse(Allratedata$domain==2&Allratedata$valence==2&Allratedata$Source=="1","com_neg_new",
                                                                                               ifelse(Allratedata$domain==2&Allratedata$valence==2&Allratedata$Source=="friend","com_neg_fri","com_neg_self")))))))))))

Allratedata<- Allratedata[c(7,1,2,3,4,5,6,10,8,9)]
write.csv(Allratedata, file="Preprocess/ratedata.csv", row.names= F)

############    Memory part    ############
## below is the tidyverse way to manipulate the data

data1 <- D1 %>%
  dplyr::filter(block_resp_1.keys == "1") %>%                                  # filter based on condition 
  dplyr::select(Num_All1,domain1,valence1,Source_1,block_resp_1.keys,          # select
                Rec_resp.keys,Rec_resp.corr,Rec_resp.rt,Source_resp.keys,
                Source_resp.corr,Source_resp.rt,participant,Age,Sex) %>%  
  dplyr::rename(Stimula_ID = Num_All1, domain = domain1,                          # rename columns
                valence = valence1, Source = Source_1)
data2 <- D1 %>%
  dplyr::filter(block_resp_1.keys == "2") %>%                                  # filter based on condition 
  dplyr::select(Num_All2,domain2,valence2,Source_2,block_resp_1.keys,          # select
                Rec_resp.keys,Rec_resp.corr,Rec_resp.rt,Source_resp.keys,
                Source_resp.corr,Source_resp.rt,participant,Age,Sex) %>%  
  dplyr::rename(Stimula_ID = Num_All2, domain = domain2,                          # rename columns
                valence = valence2, Source = Source_2)
data3 <- D1 %>%
  dplyr::filter(block_resp_1.keys == "3") %>%                                  # filter based on condition 
  dplyr::select(Num_All3,domain3,valence3,Source_3,block_resp_1.keys,          # select
                Rec_resp.keys,Rec_resp.corr,Rec_resp.rt,Source_resp.keys,
                Source_resp.corr,Source_resp.rt,participant,Age,Sex) %>%  
  dplyr::rename(Stimula_ID = Num_All3, domain = domain3,                          # rename columns
                valence = valence3, Source = Source_3)
# merge different block in to one dataframe

a <- rbind(data1,data2,data3)
attach(a)
Alldata = a[order(participant,domain,valence,Source),]
detach(a)

#delet block_resp and practice words
Alldata <- Alldata %>% dplyr::filter(Rec_resp.rt != 'NA') %>%
  filter(Stimula_ID != 'material/165.png',Stimula_ID != 'material/70.png',Stimula_ID != 'material/75.png',Stimula_ID != 'material/182.png', Stimula_ID != 'material/162.png',Stimula_ID != 'material/167.png',Stimula_ID != 'material/172.png',Stimula_ID != 'material/181.png') %>%
  dplyr::rename(Wordlist = block_resp_1.keys, NewRec.Resp = Rec_resp.keys, NewRec.Acc = Rec_resp.corr,
              NewRec.RT =  Rec_resp.rt, SourRec.Resp = Source_resp.keys, SourRec.Acc = Source_resp.corr,
              SourRec.RT =  Source_resp.rt )
  

# creat new column based on condition mutate
# the code below can be rewritten using tidyverse code, would be much easier.
Alldata$groupType <- ifelse(Alldata$domain==1&Alldata$valence==1&Alldata$Source=="1","mor_pos_new",
                             ifelse(Alldata$domain==1&Alldata$valence==1&Alldata$Source=="friend","mor_pos_fri",
                                    ifelse(Alldata$domain==1&Alldata$valence==1&Alldata$Source=="self","mor_pos_self",
                                           ifelse(Alldata$domain==1&Alldata$valence==2&Alldata$Source=="1","mor_neg_new",
                                                  ifelse(Alldata$domain==1&Alldata$valence==2&Alldata$Source=="friend","mor_neg_fri",
                                                         ifelse(Alldata$domain==1&Alldata$valence==2&Alldata$Source=="self","mor_neg_self",
                                                                ifelse(Alldata$domain==2&Alldata$valence==1&Alldata$Source=="1","com_pos_new",
                                                                       ifelse(Alldata$domain==2&Alldata$valence==1&Alldata$Source=="friend","com_pos_fri",
                                                                              ifelse(Alldata$domain==2&Alldata$valence==1&Alldata$Source=="self","com_pos_self",
                                                                                     ifelse(Alldata$domain==2&Alldata$valence==2&Alldata$Source=="1","com_neg_new",
                                                                                            ifelse(Alldata$domain==2&Alldata$valence==2&Alldata$Source=="friend","com_neg_fri","com_neg_self")))))))))))

Alldata<- Alldata[c(12,1,2,3,4,5,15,6,7,8,9,10,11,13,14)]   #reorder by column index

# To save clean data
write.csv(Alldata,file="Preprocess/cleandata.csv", row.names= F)


