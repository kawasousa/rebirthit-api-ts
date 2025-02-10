import prisma from "../config/prisma";
import { InteractionType } from "@prisma/client";
import { Interaction } from "../models/Interaction";
import { BadRequestError, ConflitError, NotFoundError } from "../errors";

export class InteractionService {
    /** Cria uma interação no banco de dados retorna o DTO dessa interação */
    public async create(advancedPostId: string, profileUsername: string, type: string): Promise<Interaction> {
        const profile = await prisma.profile.findUnique({ where: { username: profileUsername } });

        if (!profile) throw new NotFoundError('profile not found');

        const existingInteraction = await prisma.interaction.findFirst({
            where: {
                advancedPostId,
                profileId: profile.id
            }
        })

        if (existingInteraction) throw new ConflitError('this interaction already exists');

        if (!Object.values(InteractionType).includes(type as InteractionType)) throw new BadRequestError('invalid interaction type');

        const interactionType: InteractionType = type as InteractionType;

        const interaction = await prisma.interaction.create({
            data: {
                type: interactionType,
                advancedPost: {
                    connect: { id: advancedPostId }
                },
                profile: {
                    connect: { id: profile.id }
                }
            }
        })

        const interactionDTO: Interaction = new Interaction(profile.username, interaction.advancedPostId, type);
        return interactionDTO;
    }

    public async getAllByPostId(advancedPostId: string): Promise<Interaction[]> {
        const interactions = await prisma.interaction.findMany({
            where: { advancedPostId }
        })

        const interactionDTOs: Interaction[] = [];

        for (const interaction of interactions) {
            const profile = await prisma.profile.findUnique({
                where: { id: interaction.profileId },
                select: { username: true }
            })

            if (profile) {
                const interactionDTO: Interaction = new Interaction(profile.username, interaction.advancedPostId, interaction.type);
                interactionDTOs.push(interactionDTO);
            }
        }

        return interactionDTOs;
    }

    public async update(advancedPostId: string, profileUsername: string, type: string): Promise<void> {
        if (!Object.values(InteractionType).includes(type as InteractionType)) throw new BadRequestError('invalid interaction type');
        const interactionType = type as InteractionType;

        const profile = await prisma.profile.findUnique({
            where: { username: profileUsername },
        })

        if (!profile) throw new NotFoundError('profile not found');

        const existingInteraction = await prisma.interaction.findFirst({
            where: {
                advancedPostId,
                profileId: profile.id
            }
        })

        if (!existingInteraction) throw new NotFoundError('interaction not found')

        await prisma.interaction.update({
            where: {
                id: existingInteraction.id
            },
            data: {
                type: interactionType
            }
        })
    }

    public async delete(advancedPostId: string, profileUsername: string): Promise<void> {
        const profile = await prisma.profile.findUnique({
            where: { username: profileUsername },
        })

        if (!profile) throw new NotFoundError('profile not found');

        const existingInteraction = await prisma.interaction.findFirst({
            where: {
                advancedPostId,
                profileId: profile.id
            }
        })

        if (!existingInteraction) throw new NotFoundError('interaction not found');

        await prisma.interaction.delete({
            where: {
                id: existingInteraction.id
            }
        })
    }
}