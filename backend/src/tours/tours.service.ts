import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Tour } from './entities/tour.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  create(createTourDto: CreateTourDto) {
    const tour = this.tourRepository.create(createTourDto);
    return this.tourRepository.save(tour);
  }

  findAll() {
    // Esta es la línea clave: ahora devuelve una promesa de un arreglo de tours
    return this.tourRepository.find();
  }

  findOne(id: string) {
    return this.tourRepository.findOneBy({ id });
  }

  async update(id: string, updateTourDto: UpdateTourDto) {
    const tour = await this.findOne(id);
    if (!tour) {
      // Manejar el caso de que el tour no se encuentre
      return null;
    }
    this.tourRepository.merge(tour, updateTourDto);
    return this.tourRepository.save(tour);
  }

  remove(id: string) {
    return this.tourRepository.delete(id);
  }
}