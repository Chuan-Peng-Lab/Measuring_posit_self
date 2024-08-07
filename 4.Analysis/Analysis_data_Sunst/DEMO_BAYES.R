devtools::install_github("cran/sdtalt")
library(sdtalt)
data(confcontr)

#EVSDT
sdt <- confcontr %>% 
  mutate(type = "hit",
         type = ifelse(isold==1 & sayold==0, "miss", type),
         type = ifelse(isold==0 & sayold==0, "cr", type),  # Correct rejection
         type = ifelse(isold==0 & sayold==1, "fa", type))  # False alarm
sdt <- sdt %>% 
  group_by(subno, type) %>% 
  summarise(count = n()) %>% 
  spread(type, count)  # Format data to one row per person
sdt <- sdt %>% 
  mutate(zhr = qnorm(hit / (hit+miss)),
         zfa = qnorm(fa / (fa+cr)),
         dprime = zhr-zfa,
         crit = -zfa)
round(sdt, 2)