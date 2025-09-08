import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';
import { Tour } from './entities/tour.entity';

@Controller('tours')
@UseGuards(JwtAuthGuard, PoliciesGuard) // ¡Primero autentica, luego autoriza!
export class ToursController {
  constructor(private readonly toursService: ToursService) { }

  @Post()
  @CheckPolicies((ability) => ability.can(Action.Create, Tour))
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.Read, Tour))
  findAll() {
    return this.toursService.findAll();
  }

  // GET por ID no estaba en el prompt, pero se protegería igual que findAll

  @Patch(':id')
  @CheckPolicies((ability) => ability.can(Action.Update, Tour))
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(id, updateTourDto);
  }

  @Delete(':id')
  @CheckPolicies((ability) => ability.can(Action.Delete, Tour))
  remove(@Param('id') id: string) {
    return this.toursService.remove(id);
  }
}