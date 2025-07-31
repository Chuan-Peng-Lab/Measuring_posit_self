data {
  int<lower=1> N;           // 样本数
  int<lower=1> P;           // 变量数
  int<lower=1> K;           // 潜在因子数
  matrix[N, P] Y;           // 数据矩阵
}

parameters {
  matrix[P, K] Lambda;      // 因子载荷矩阵
  matrix[N, K] eta;         // 潜变量
  vector<lower=0>[P] sigma; // 噪声标准差

  // Spike-and-Slab 结构
  vector<lower=0, upper=1>[P*K] gamma; // 因子是否包含（0=剔除）
}

model {
  // 因子载荷乘以二项式开关（Spike-and-Slab）
  for (i in 1:P) {
    for (j in 1:K) {
      real lambda_ij = Lambda[i, j] * gamma[(i - 1) * K + j];
      Lambda[i, j] ~ normal(0, 0.5); // slab先验
    }
  }

  // 潜变量和噪声先验
  to_vector(eta) ~ normal(0, 0.5);
  sigma ~ cauchy(0, 1);

  // 观测模型
  for (n in 1:N) {
    row_vector[P] mu = (eta[n] * Lambda');  // n行K列 × K列P行 = n行P列
    Y[n] ~ normal(mu, sigma');
  }
}