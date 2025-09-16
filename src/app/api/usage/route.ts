import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token?.email) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { email: token.email as string },
      select: {
        id: true,
        plan: true,
        usageCount: true,
        usageLimit: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    return NextResponse.json({
      usageCount: user.usageCount,
      usageLimit: user.usageLimit,
      plan: user.plan,
      canUpload: user.usageCount < user.usageLimit,
    });
  } catch (error) {
    console.error("Erreur de vérification de l'utilisation :", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token?.email) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const user = await prisma.users.findUnique({
    where: { email: token.email as string },
    select: {
      id: true,
      plan: true,
      usageCount: true,
      usageLimit: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  // Check if user can upload
  if (user.usageCount >= user.usageLimit) {
    return NextResponse.json(
      {
        error: "Limite d'utilisation atteinte",
        usageCount: user.usageCount,
        usageLimit: user.usageLimit,
        plan: user.plan,
        canUpload: false,
      },
      { status: 403 }
    );
  }

  // Increment usage count
  const updatedUser = await prisma.users.update({
    where: { id: user.id },
    data: {
      usageCount: user?.usageCount + 1,
    },
    select: {
      usageCount: true,
      usageLimit: true,
      plan: true,
    },
  });

  return NextResponse.json({
    usageCount: updatedUser.usageCount,
    usageLimit: updatedUser.usageLimit,
    plan: updatedUser.plan,
    canUpload: updatedUser.usageCount < updatedUser.usageLimit,
  });
}
