# Cadastro de carros

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já existente.
O Carro deve ser cadastrado, disponível para aluguel por padrão.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível listar os carros disponíveis.
Deve ser possível filtrar os carros disponíveis pela categoria.
Deve ser possível filtrar os carros disponíveis pela marca.
Deve ser possível filtrar os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação do carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de Imagens do carro

**RF**
Deve ser possível cadastrar uma ou mais imagens para um carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 horas.
O aluguel só pode ser feito por usuários autenticados.
O aluguel só pode ser feito para carros existentes.
Não deve ser possível cadastrar um novo aluguel, caso já exista um aluguel aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel, caso já exista um aluguel aberto para o mesmo carro.
