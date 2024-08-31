import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criar alguns ingredientes
  const ingrediente1 = await prisma.ingredients.create({
    data: { name: 'Açúcar' },
  });

  const ingrediente2 = await prisma.ingredients.create({
    data: { name: 'Água' },
  });

  const ingrediente3 = await prisma.ingredients.create({
    data: { name: 'Limão' },
  });
  const ingrediente4 = await prisma.ingredients.create({
    data: { name: 'Laranja' },
  });

  // Criar produtos com receitas
  const produto1 = await prisma.products.create({
    data: {
      name: 'Limonada',
      description: 'Limonada refrescante feita com limões frescos.',
      price: 5.5,
      recipe: {
        create: [
          { ingredient: { connect: { id: ingrediente1.id } } },
          { ingredient: { connect: { id: ingrediente2.id } } },
          { ingredient: { connect: { id: ingrediente3.id } } },
        ],
      },
    },
  });

  const produto2 = await prisma.products.create({
    data: {
      name: 'Suco de Laranja',
      description: 'Suco de laranja natural e refrescante.',
      price: 6.0,
      recipe: {
        create: [
          { ingredient: { connect: { id: ingrediente1.id } } },
          { ingredient: { connect: { id: ingrediente2.id } } },
          { ingredient: { connect: { id: ingrediente4.id } } },
        ],
      },
    },
  });

  // Criar um endereço para uma estação de suco
  const enderecoEstacao1 = await prisma.stationAddress.create({
    data: {
      street: 'Rua das Laranjeiras',
      reference: 'Em frente ao mercado',
      city: 'São Paulo',
      state: 'SP',
      cep: '01234-567',
    },
  });

  const enderecoEstacao2 = await prisma.stationAddress.create({
    data: {
      street: 'Av Sete de Setembro',
      reference: 'Proximo ao Farol da Barra',
      city: 'Salvador',
      state: 'BA',
      cep: '01234-567',
    },
  });

  // Criar uma estação de suco
  const estacaoDeSuco1 = await prisma.juiceStation.create({
    data: {
      name: 'Estação de Suco Central',
      status: 'OPEN',
      description: 'A principal estação de sucos da cidade.',
      address: { connect: { id: enderecoEstacao1.id } },
    },
  });

  const estacaoDeSuco2 = await prisma.juiceStation.create({
    data: {
      name: 'Estação de Suco Barra',
      status: 'OPEN',
      description: 'A estação de sucos mais quente da cidade.',
      address: { connect: { id: enderecoEstacao2.id } },
    },
  });

  // Criar um usuário com endereço
  const usuario = await prisma.users.create({
    data: {
      firstName: 'Carlos',
      lastName: 'Silva',
      cpf: '123.456.789-00',
      username: 'carlossilva',
      password: bcrypt.hashSync('senha123', 10),
      address: {
        create: {
          street: 'Avenida Paulista',
          reference: 'Apt 101',
          city: 'São Paulo',
          state: 'SP',
          cep: '01311-000',
        },
      },
    },
  });

  // Criar um pedido
  const pedido = await prisma.orders.create({
    data: {
      user: { connect: { id: usuario.id } },
      status: 'CREATED',
      station: { connect: { id: estacaoDeSuco1.id } },
      takeAwayDate: new Date(),
      products: {
        create: [
          { product: { connect: { id: produto1.id } } },
          { product: { connect: { id: produto2.id } } },
        ],
      },
    },
  });

  console.log('Banco de dados preenchido com dados padrão.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
