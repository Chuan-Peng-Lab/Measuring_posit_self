data {
  int<lower=1> N;            // 观测数
  int<lower=1> P;            // 变量数（条目数）
  int<lower=1> K;            // 因子数
  matrix[N, P] Y;            // 观测数据（中心化处理）
}

parameters {
  // 因子载荷矩阵
  matrix[P, K] Lambda;

  // 残差标准差
  vector<lower=0>[P] sigma;

  // 因子得分
  matrix[N, K] eta;

  // horseshoe prior 的局部收缩参数和全局收缩参数
  vector<lower=0>[P * K] lambda_local;
  real<lower=0> tau_global;
}

transformed parameters {
  // horseshoe 先验的标准差
  vector[P * K] lambda_hs;
  for (i in 1:(P * K)) {
    lambda_hs[i] = tau_global * lambda_local[i];
  }
}

model {
  // Horseshoe priors
  lambda_local ~ cauchy(0, 1);
  tau_global ~ cauchy(0, 1);
  
  for (p in 1:P) {
    for (k in 1:K) {
      Lambda[p, k] ~ normal(0, lambda_hs[(p - 1) * K + k]);
    }
  }

  sigma ~ normal(0, 1);        // 可替换为 half-Cauchy(0,1) 看你是否希望更保守
  to_vector(eta) ~ normal(0, 1);  // 因子得分标准正态
  
  // likelihood
  for (n in 1:N)
    Y[n] ~ normal(Lambda * eta[n]', sigma');
}